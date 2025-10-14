import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adicional } from '../../models/adicional/adicional.model';
import { Categoria } from '../../models/categoria/categoria.model';
import { AdicionalService } from '../../services/adicional.service';

@Component({
  selector: 'app-adicional-form',
  templateUrl: './adicional-form.component.html',
  styleUrls: ['./adicional-form.component.css']
})
export class AdicionalFormComponent implements OnInit {

  adicional: Adicional = { nombre: '', precio: 0, categorias: [] };
  isEditMode = false;
  pageTitle = 'Agregar Adicional';

  listaCategorias: Categoria[] = [
    { id: 1, nombre: 'Antipastos', slug: 'antipastos' },
    { id: 2, nombre: 'Pizzas', slug: 'pizzas' },
    { id: 3, nombre: 'Pastas', slug: 'pastas' },
    { id: 4, nombre: 'Risottos', slug: 'risottos' },
    { id: 5, nombre: 'Postres', slug: 'postres' },
    { id: 6, nombre: 'Bebidas', slug: 'bebidas' }
  ];

  constructor(
    private adicionalService: AdicionalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Adicional';
      const adicionalId = +idParam;

      this.adicionalService.getAdicionalById(adicionalId).subscribe(data => {
        this.adicional = data;
        if (!this.adicional.categorias) {
          this.adicional.categorias = [];
        }
      });
    }
  }

  isCategoriaSeleccionada(categoria: Categoria): boolean {
    return this.adicional.categorias?.some(c => c.id === categoria.id) || false;
  }

  onCategoriaChange(categoria: Categoria, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.isCategoriaSeleccionada(categoria)) {
        this.adicional.categorias?.push(categoria);
      }
    } else {
      const index = this.adicional.categorias?.findIndex(c => c.id === categoria.id);
      if (index !== undefined && index > -1) {
        this.adicional.categorias?.splice(index, 1);
      }
    }
  }

  guardarAdicional(): void {
    if (!this.adicional.nombre.trim() || this.adicional.precio <= 0) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    if (this.isEditMode) {
      this.adicionalService.actualizarAdicional(this.adicional.id!, this.adicional).subscribe(() => {
        alert('Adicional actualizado correctamente ✅');
        this.router.navigate(['/dashboard/adicionales']);
      });
    } else {
      this.adicionalService.crearAdicional(this.adicional).subscribe(() => {
        alert('Adicional creado correctamente 🎉');
        this.router.navigate(['/dashboard/adicionales']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/adicionales']);
  }
}
