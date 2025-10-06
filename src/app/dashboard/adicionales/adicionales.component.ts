import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdicionalService } from '../../services/adicional.service';
import { Adicional } from '../../models/adicional/adicional.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
selector: 'app-adicionales',
templateUrl: './adicionales.component.html',
styleUrls: ['./adicionales.component.css']
})
export class AdicionalesComponent implements OnInit {

adicionales: Adicional[] = [];

constructor(
private adicionalService: AdicionalService,
private router: Router
) {}

ngOnInit(): void {
this.cargarAdicionales();
}

cargarAdicionales(): void {
this.adicionalService.getAll().subscribe({
next: (data) => this.adicionales = data,
error: (err) => console.error('❌ Error al cargar adicionales:', err)
});
}

agregarAdicional(): void {
this.router.navigate(['/adicionales/nuevo']);
}

editarAdicional(id: number): void {
this.router.navigate(['/adicionales/editar', id]);
}

eliminarAdicional(id: number): void {
const confirmacion = confirm('¿Estás seguro de que deseas eliminar este adicional?');
if (confirmacion) {
this.adicionalService.delete(id).subscribe({
next: () => {
this.adicionales = this.adicionales.filter(a => a.id !== id);
console.log(`✅ Adicional con ID ${id} eliminado`);
},
error: (err: HttpErrorResponse) => {
console.error('❌ Error al eliminar adicional:', err);
alert('No se pudo eliminar el adicional.');
}
});
}
}
}
