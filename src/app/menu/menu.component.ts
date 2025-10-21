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
  extras: Adicional[] = [];            // lista de adicionales cargados
  showExtrasModal = false;             // mostrar/ocultar modal
  selectedComida?: Comida;             // comida actualmente seleccionada
  selectedAdicional: Adicional | null = null;
  loadingExtras = false;

  // al inicio del componente
  orderMode: 'domicilio' | 'recoger' = (localStorage.getItem('order_mode') as any) || 'domicilio';

  setOrderMode(mode: 'domicilio' | 'recoger') {
    this.orderMode = mode;
    localStorage.setItem('order_mode', mode);
  }
  isDomicilio(): boolean { return this.orderMode === 'domicilio'; }
  isRecoger(): boolean { return this.orderMode === 'recoger'; }


  // cuando el usuario presiona "Agregar" y hay que esperar el adicional
  private pendingCantidad = 1;

  // ❗ Ajusta aquí qué categorías requieren adicional sí o sí
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
    this.selectedAdicional = null;
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
        console.error(' Error al cargar adicionales:', err);
        this.loadingExtras = false;
      }
    });
  }

  // =========================
  //     AGREGAR AL CARRO
  // =========================

  /**
   * Handler del botón "Agregar" en la tarjeta.
   * - Si la categoría requiere adicional → abre modal.
   * - Si no requiere → agrega directo con la cantidad (>=1).
   */
  onAgregarClick(comida: Comida) {
    const cantidad = Math.max(comida.cantidad || 0, 1);
    const slug = (comida.categoria?.slug || '').toLowerCase();

    if (this.CATS_REQUIEREN_ADICIONAL.has(slug)) {
      // guardar cantidad pendiente y abrir modal
      this.pendingCantidad = cantidad;
      this.verAdicionales(comida);
      return;
    }

    // Agregar directo sin adicional
    this.agregarAlCarro(comida, cantidad, null);
    // limpiar cantidad en UI
    comida.cantidad = 0;
  }

  /**
   * Click en "Confirmar selección" del modal de adicionales.
   */
  confirmarSeleccion() {
    if (!this.selectedComida) return;

    this.agregarAlCarro(this.selectedComida, this.pendingCantidad, this.selectedAdicional);
    // limpiar estado de modal
    this.selectedComida.cantidad = 0;
    this.selectedComida = undefined;
    this.selectedAdicional = null;
    this.pendingCantidad = 1;
    this.showExtrasModal = false;
  }

  /**
   * Agrega realmente al CartService con o sin adicional.
   * (con chequeos de tipos para evitar (number|undefined)[])
   */
  private agregarAlCarro(comida: Comida, cantidad: number, adicional: Adicional | null) {
    let adicionalIds: number[] = [];
    let adicionales: Array<{ id: number; nombre: string; precio?: number }> = [];

    if (adicional && typeof adicional.id === 'number') {
      adicionalIds = [adicional.id]; // ahora es number[]
      adicionales = [{
        id: adicional.id,
        nombre: (adicional as any).nombre ?? '',
        // si tu modelo tiene precio, úsalo; si no, puedes quitar este campo
        precio: (adicional as any).precio
      }];
    }

    this.cart.add({
      comidaId: Number(comida.id),           // asegura number (por si viene opcional)
      nombre: String(comida.nombre ?? ''),
      precio: Number(comida.precio),
      cantidad,
      image: comida.imagen,
      adicionalIds,
      adicionales
    });
    this.mostrarToast();
  }

  // Método para mostrar el aviso de pedido agregado
  private mostrarToast(): void {
    const toastEl = document.getElementById('pedidoToast');
    if (!toastEl) return;

    // Inicializa el Toast de Bootstrap
    const toast = new (window as any).bootstrap.Toast(toastEl, {
      delay: 3500 // duración en milisegundos (3.5 segundos)
    });
    toast.show();
  }

  // =========================
  //    LEGACY / PLACEHOLDER
  // =========================

  addAdicionalToComida(ad: Adicional) {
    this.selectedAdicional = ad;
  }

  agregarPedido(comida: Comida) {
    this.onAgregarClick(comida);
  }


}
