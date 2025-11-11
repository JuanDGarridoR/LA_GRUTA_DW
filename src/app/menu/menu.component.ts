import { Component, OnInit } from '@angular/core';
import { Comida } from '../models/comida/comida.model';
import { Categoria, CATEGORIAS } from '../models/categoria/categoria.model';
import { ComidaService } from '../services/comida.service';
import { AdicionalService } from '../services/adicional.service';
import { Adicional } from '../models/adicional/adicional.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  comidas: Comida[] = [];
  categorias: Categoria[] = [];

  extras: Adicional[] = [];
  showExtrasModal = false;
  selectedComida?: Comida;
  selectedAdicionales: Adicional[] = [];
  loadingExtras = false;

  private pendingCantidad = 1;
  private readonly MAX_ADICIONALES = 4;

  orderMode: 'domicilio' | 'recoger' = (localStorage.getItem('order_mode') as any) || 'domicilio';

  constructor(
    private comidaService: ComidaService,
    private adicionalService: AdicionalService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.categorias = CATEGORIAS;

    this.comidaService.getComidas().subscribe({
      next: (data: Comida[]) => this.comidas = data,
      error: (err: any) => console.error('❌ Error al cargar comidas:', err)
    });
  }

  sumarCantidad(comida: Comida) {
    comida.cantidad = (comida.cantidad || 0) + 1;
  }

  restarCantidad(comida: Comida) {
    comida.cantidad = Math.max((comida.cantidad || 0) - 1, 0);
  }

  getComidasPorCategoria(slug: string): Comida[] {
    return this.comidas.filter(
      c => c.categoria?.slug?.toLowerCase() === slug.toLowerCase()
    );
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return 'assets/images/default-placeholder.png';
    if (path.startsWith('http')) return path;
    const base = 'http://localhost:8080';
    return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
  }

  // =========================
  // MODAL DE ADICIONALES
  // =========================

  verAdicionales(comida: Comida) {
    this.selectedComida = comida;
    this.selectedAdicionales = [];
    this.extras = [];
    this.loadingExtras = true;
    this.showExtrasModal = true;

    const slug = comida.categoria?.slug;
    if (!slug) {
      console.warn('Esta comida no tiene categoría asociada.');
      this.loadingExtras = false;
      return;
    }

    this.adicionalService.getByCategoriaSlug(slug).subscribe({
      next: (data: Adicional[]) => {
        this.extras = data ?? [];
        this.loadingExtras = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar adicionales:', err);
        this.loadingExtras = false;
      }
    });
  }

  toggleAdicional(adicional: Adicional) {
    const index = this.selectedAdicionales.findIndex(a => a.id === adicional.id);
    if (index >= 0) {
      this.selectedAdicionales.splice(index, 1);
    } else if (this.selectedAdicionales.length < this.MAX_ADICIONALES) {
      this.selectedAdicionales.push(adicional);
    } else {
      alert(`Solo puedes seleccionar hasta ${this.MAX_ADICIONALES} adicionales.`);
    }
  }

  isAdicionalSeleccionado(adicional: Adicional): boolean {
    return this.selectedAdicionales.some(a => a.id === adicional.id);
  }

  // =========================
  // AGREGAR AL CARRITO
  // =========================

  onAgregarClick(comida: Comida) {
    const cantidad = Math.max(comida.cantidad || 0, 1);
    this.pendingCantidad = cantidad;
    this.verAdicionales(comida);
  }

  confirmarSeleccion() {
    if (!this.selectedComida) return;

    this.agregarAlCarro(this.selectedComida, this.pendingCantidad, this.selectedAdicionales);

    this.selectedComida.cantidad = 0;
    this.selectedComida = undefined;
    this.selectedAdicionales = [];
    this.pendingCantidad = 1;
    this.showExtrasModal = false;
  }

  private agregarAlCarro(comida: Comida, cantidad: number, adicionales: Adicional[] = []) {
    const adicionalIds = adicionales
      .filter(a => typeof a.id === 'number')
      .map(a => a.id as number);

    this.cart.add({
      comidaId: Number(comida.id),
      nombre: String(comida.nombre ?? ''),
      precio: Number(comida.precio),
      cantidad,
      image: comida.imagen,
      adicionalIds,
      adicionales
    });
    this.mostrarToast();
  }

  private mostrarToast(): void {
    const toastEl = document.getElementById('pedidoToast');
    if (!toastEl) return;

    const toast = new (window as any).bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();
  }
}
