// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/carro/carro.model';

const LS_KEY = 'cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items$ = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this._items$.asObservable();

  // 👉 NUEVO: emite el ítem agregado (para mini-toast / pulse en el header)
  private _lastAdded$ = new Subject<CartItem>();
  lastAdded$ = this._lastAdded$.asObservable();

  private load(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
    catch { return []; }
  }
  private persist(items: CartItem[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }

  get items(): CartItem[] { return this._items$.value; }

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

    // 🔔 Aviso para UI (header)
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

  clear() {
    this._items$.next([]);
    this.persist([]);
  }

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
