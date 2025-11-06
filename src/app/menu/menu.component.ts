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

  // Modal de adicionales
  extras: Adicional[] = [];                     // lista de adicionales cargados
  showExtrasModal = false;                      // mostrar/ocultar modal
  selectedComida?: Comida;                      // comida actualmente seleccionada
  selectedAdicionales: Adicional[] = [];        // ✅ múltiples adicionales seleccionados
  loadingExtras = false;

  // Cantidad pendiente
  private pendingCantidad = 1;                  // ✅ mínimo 1
  private readonly MAX_ADICIONALES = 4;         // ✅ máximo 4 diferentes adicionales

  // Modo de pedido
  orderMode: 'domicilio' | 'recoger' = (localStorage.getItem('order_mode') as any) || 'domicilio';

  setOrderMode(mode: 'domicilio' | 'recoger') {
    this.orderMode = mode;
    localStorage.setItem('order_mode', mode);
  }
  isDomicilio(): boolean { return this.orderMode === 'domicilio'; }
  isRecoger(): boolean { return this.orderMode === 'recoger'; }

  // Categorías que requieren adicional obligatorio
  private readonly CATS_REQUIEREN_ADICIONAL = new Set<string>([
    // 'combos',
    // 'pizzas-personalizadas'
  ]);

  constructor(
    private comidaService: ComidaService,
    private adicionalService: AdicionalService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.categorias = CATEGORIAS;

    this.comidaService.getComidas().subscribe({
      next: (data: Comida[]) => { this.comidas = data; },
      error: (err: any) => { console.error('❌ Error al cargar comidas:', err); }
    });
  }

  // =========================
  //      LÓGICA DE UI
  // =========================

  sumarCantidad(comida: Comida) {
    comida.cantidad = (comida.cantidad || 0) + 1;
  }

  restarCantidad(comida: Comida) {
    const actual = comida.cantidad || 0;
    comida.cantidad = Math.max(actual - 1, 0);
  }

  // Filtra las comidas de una categoría
  getComidasPorCategoria(slug: string): Comida[] {
    return this.comidas.filter(
      c => c.categoria?.slug?.toLowerCase() === slug.toLowerCase()
    );
  }

  // Imagen segura
  getImageUrl(path: string | undefined): string {
    if (!path) return 'assets/images/default-placeholder.png';
    if (path.startsWith('http')) return path;

    const base = 'http://localhost:8080';
    return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
  }

  // =========================
  //     ADICIONALES / MODAL
  // =========================

  verAdicionales(comida: Comida) {
    this.selectedComida = comida;
    this.selectedAdicionales = [];  // limpiar selección anterior
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

  // ✅ alternar selección de adicionales (checkboxes)
  toggleAdicional(adicional: Adicional) {
    const index = this.selectedAdicionales.findIndex(a => a.id === adicional.id);
    if (index >= 0) {
      // si ya está seleccionado, lo quitamos
      this.selectedAdicionales.splice(index, 1);
    } else {
      // si no está, lo agregamos (si no supera el máximo)
      if (this.selectedAdicionales.length < this.MAX_ADICIONALES) {
        this.selectedAdicionales.push(adicional);
      } else {
        alert(`Solo puedes seleccionar hasta ${this.MAX_ADICIONALES} adicionales.`);
      }
    }
  }

  // =========================
  //     AGREGAR AL CARRO
  // =========================

  onAgregarClick(comida: Comida) {
    const cantidad = Math.max(comida.cantidad || 0, 1); // ✅ siempre mínimo 1
    const slug = (comida.categoria?.slug || '').toLowerCase();

    if (this.CATS_REQUIEREN_ADICIONAL.has(slug)) {
      // guardar cantidad pendiente y abrir modal
      this.pendingCantidad = cantidad;
      this.verAdicionales(comida);
      return;
    }

    // Agregar directo sin adicional
    this.agregarAlCarro(comida, cantidad, []);
    comida.cantidad = 0;
  }

  confirmarSeleccion() {
    if (!this.selectedComida) return;

    const cantidad = Math.max(this.pendingCantidad, 1);
    this.agregarAlCarro(this.selectedComida, cantidad, this.selectedAdicionales);

    // limpiar modal
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

    const adicionalesData = adicionales.map(a => ({
      id: a.id!,
      nombre: (a as any).nombre ?? '',
      precio: (a as any).precio
    }));

    this.cart.add({
      comidaId: Number(comida.id),
      nombre: String(comida.nombre ?? ''),
      precio: Number(comida.precio),
      cantidad,
      image: comida.imagen,
      adicionalIds,
      adicionales: adicionalesData
    });
    this.mostrarToast();
  }

  // Método para mostrar el aviso de pedido agregado
  private mostrarToast(): void {
    const toastEl = document.getElementById('pedidoToast');
    if (!toastEl) return;

    const toast = new (window as any).bootstrap.Toast(toastEl, {
      delay: 3500
    });
    toast.show();
  }

  // =========================
  //    LEGACY / PLACEHOLDER
  // =========================

  agregarPedido(comida: Comida) {
    this.onAgregarClick(comida);
  }

  isAdicionalSeleccionado(adicional: any): boolean {
  return this.selectedAdicionales?.some(a => a.id === adicional.id) || false;
}


}
