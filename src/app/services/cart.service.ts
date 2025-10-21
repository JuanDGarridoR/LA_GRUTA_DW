// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/carro/carro.model';
import { AutenticacionService } from './autenticacion.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly LS_KEY_BASE = 'cart_v1_';
  private _items$ = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this._items$.asObservable();

  // Emite el ítem agregado (para mini-toast / pulse en el header)
  private _lastAdded$ = new Subject<CartItem>();
  lastAdded$ = this._lastAdded$.asObservable();

  constructor(private authService: AutenticacionService) {}

  // ============================
  // Claves y acceso a localStorage
  // ============================
  private get storageKey(): string {
    const userId = this.authService.getUserId();
    return `${this.LS_KEY_BASE}${userId ?? 'guest'}`;
  }
  private keyFor(userId: number | null | undefined): string {
    return `${this.LS_KEY_BASE}${userId ?? 'guest'}`;
  }

  private readKey<T = CartItem[]>(key: string): T {
    try {
      const raw = localStorage.getItem(key);
      return (raw ? JSON.parse(raw) : []) as T;
    } catch {
      return [] as unknown as T;
    }
  }
  private writeKey(key: string, items: CartItem[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  private load(): CartItem[] {
    return this.readKey<CartItem[]>(this.storageKey);
  }

  private persist(items: CartItem[]) {
    this.writeKey(this.storageKey, items);
  }

  get items(): CartItem[] {
    return this._items$.value;
  }

  // ============================
  // Sincronización / Migración
  // ============================
  /** Carga el carrito de la clave actual (usuario o invitado). */
  syncWithUser(migrateGuest = false): void {
    const userId = this.authService.getUserId();
    const userKey = this.keyFor(userId);
    const guestKey = this.keyFor(null);

    if (migrateGuest && userId) {
      const guestItems = this.readKey<CartItem[]>(guestKey);
      const userItems = this.readKey<CartItem[]>(userKey);

      if (guestItems.length > 0) {
        const merged = this.mergeItems(userItems, guestItems);
        this.writeKey(userKey, merged);
        localStorage.removeItem(guestKey);
      }
    }

    const items = this.readKey<CartItem[]>(userKey);
    this._items$.next(items);
  }

  /** Carga el carrito del invitado (se usa tras logout). */
  syncAsGuest(): void {
    const items = this.readKey<CartItem[]>(this.keyFor(null));
    this._items$.next(items);
  }

  /** Une dos listas de ítems sumando cantidades por (comidaId + adicionalIds). */
  private mergeItems(base: CartItem[], incoming: CartItem[]): CartItem[] {
    const result = [...base];

    const normKey = (it: CartItem) =>
      `${it.comidaId}|${JSON.stringify(it.adicionalIds ?? [])}`;

    for (const add of incoming) {
      const k = normKey(add);
      const idx = result.findIndex(r => normKey(r) === k);
      if (idx >= 0) {
        result[idx] = { ...result[idx], cantidad: result[idx].cantidad + add.cantidad };
      } else {
        result.push(add);
      }
    }
    return result;
  }

  // ============================
  // CRUD del carrito
  // ============================
  add(item: CartItem) {
    const items = [...this.items];
    const key = JSON.stringify(item.adicionalIds ?? []);
    const idx = items.findIndex(
      x => x.comidaId === item.comidaId &&
           JSON.stringify(x.adicionalIds ?? []) === key
    );

    let merged: CartItem;
    if (idx >= 0) {
      merged = items[idx] = { ...items[idx], cantidad: items[idx].cantidad + item.cantidad };
    } else {
      merged = item;
      items.push(item);
    }

    this._items$.next(items);
    this.persist(items);
    this._lastAdded$.next(merged);
  }

  updateCantidad(comidaId: number, adicionalIds: number[] | undefined, cantidad: number) {
    const key = JSON.stringify(adicionalIds ?? []);
    const items = this.items
      .map(x =>
        (x.comidaId === comidaId && JSON.stringify(x.adicionalIds ?? []) === key)
          ? { ...x, cantidad }
          : x
      )
      .filter(x => x.cantidad > 0);
    this._items$.next(items);
    this.persist(items);
  }

  remove(comidaId: number, adicionalIds?: number[]) {
    const key = JSON.stringify(adicionalIds ?? []);
    const items = this.items.filter(
      x => !(x.comidaId === comidaId && JSON.stringify(x.adicionalIds ?? []) === key)
    );
    this._items$.next(items);
    this.persist(items);
  }

  /** Vacía SOLO el carrito de la clave actual (usuario o invitado). */
  clear() {
    this._items$.next([]);
    this.persist([]);
  }

  // ============================
  // Totales
  // ============================
  total(): number {
    return this.items.reduce((acc, it) => {
      const adTotal = (it.adicionales ?? []).reduce((s, a) => s + (a.precio ?? 0), 0);
      return acc + (it.precio + adTotal) * it.cantidad;
    }, 0);
  }

  count(): number {
    return this.items.reduce((n, it) => n + it.cantidad, 0);
  }
}
