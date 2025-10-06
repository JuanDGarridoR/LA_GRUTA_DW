
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Adicional } from '../../models/adicional/adicional.model';
import { AdicionalService } from 'src/app/services/adicional.service';

@Component({
  selector: 'app-aditional-form',
  templateUrl: './aditional-form.component.html',
  styleUrls: ['./aditional-form.component.css']
})
export class AditionalFormComponent implements OnInit {
  @Input() adicionalSeleccionado?: Adicional;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  adicionalForm: FormGroup;
  editMode = false;

  // 🔹 Propiedades faltantes del HTML
  pageTitle = 'Gestión de Adicionales';
  categorias: string[] = ['Comida', 'Bebida', 'Postre', 'Extra'];
  adicionales: Adicional[] = [];

  constructor(
    private fb: FormBuilder,
    private adicionalesService: AdicionalService
  ) {
    this.adicionalForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.adicionalSeleccionado) {
      this.editMode = true;
      this.adicionalForm.patchValue(this.adicionalSeleccionado);
    }
  }

  // Crear o actualizar un adicional
  onSubmit(): void {
    if (this.adicionalForm.invalid) return;

    const adicional: Adicional = this.adicionalForm.value;

    if (this.editMode && adicional.id != null) {
      this.adicionalesService.actualizarAdicional(adicional.id, adicional).subscribe(() => {
        this.guardado.emit();
      });
    } else {
      this.adicionalesService.crearAdicional(adicional).subscribe(() => {
        this.guardado.emit();
      });
    }
  }

  // Función de edición
  editarAdicional(id: number): void {
    this.adicionalesService.obtenerAdicionalPorId(id).subscribe((data: Adicional) => {
      this.editMode = true;
      this.adicionalSeleccionado = data;
      this.adicionalForm.patchValue(data);
    });
  }

  // Función de eliminación
  eliminarAdicional(id: number): void {
    if (confirm('¿Estás seguro de eliminar este adicional?')) {
      this.adicionalesService.eliminarAdicional(id).subscribe(() => {
        alert('Adicional eliminado correctamente');
        this.guardado.emit();
      });
    }
  }

  // Cancelar
  cancelar(): void {
    this.cancelado.emit();
  }
}

