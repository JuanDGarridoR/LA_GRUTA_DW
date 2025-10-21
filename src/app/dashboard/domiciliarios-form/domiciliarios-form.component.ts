import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomiciliarioService } from '../../services/domiciliario.service';
import { Domiciliario } from '../../models/domiciliario/domiciliario.model';

@Component({
  selector: 'app-domiciliarios-form',
  templateUrl: './domiciliarios-form.component.html',
  styleUrls: ['./domiciliarios-form.component.css']
})
export class DomiciliariosFormComponent implements OnInit {
  domiciliario: Domiciliario = {
    id: undefined,
    nombre: '',
    correo: '',
    telefono: '',
    vehiculo: '',
    placa: '',
    disponible: true,
    zonaCobertura: ''
  };

  editMode = false;

  constructor(
    private domiciliarioService: DomiciliarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.domiciliarioService.getById(+id).subscribe({
        next: (data) => (this.domiciliario = data),
        error: (err) => console.error('Error al obtener domiciliario', err)
      });
    }
  }

  guardar(): void {
    if (this.editMode) {
      this.domiciliarioService.update(this.domiciliario).subscribe({
        next: () => this.router.navigate(['/dashboard/domiciliarios']),
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.domiciliarioService.add(this.domiciliario).subscribe({
        next: () => this.router.navigate(['/dashboard/domiciliarios']),
        error: (err) => console.error('Error al crear', err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/domiciliarios']);
  }
}
