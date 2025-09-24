import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // <-- Importa ActivatedRoute
import { Comida, COMIDAS } from '../../models/comida/comida.model';
import { Categoria, CATEGORIAS } from '../../models/categoria/categoria.model';

@Component({
  selector: 'app-comidas-form',
  templateUrl: './comidas-form.component.html',
  styleUrls: ['./comidas-form.component.css']
})
export class ComidasFormComponent implements OnInit {

  comida: Comida | undefined;
  categorias: Categoria[] = [];
  isEditMode = false;
  pageTitle = 'Agregar Nueva Comida';

  // Inyectamos ActivatedRoute para poder leer la URL
  constructor(
    private router: Router,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.categorias = CATEGORIAS;
    
    // Leemos el parámetro 'id' de la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Comida';
      const comidaId = +idParam; // El '+' convierte el string a número
      
      // Buscamos la comida en nuestros datos quemados
      // En un futuro, esto sería una llamada a un servicio: this.comidaService.getComidaById(comidaId)
      const foundComida = COMIDAS.find(c => c.id === comidaId);
      
      // Usamos una copia para no modificar el original hasta guardar
      this.comida = foundComida ? { ...foundComida } : undefined;
    } else {
      // Si no hay ID, estamos en modo "Agregar"
      this.isEditMode = false;
      this.pageTitle = 'Agregar Nueva Comida';
      this.comida = {
        nombre: '',
        descripcion: '',
        precio: 0,
        imagen: 'assets/images/default-placeholder.png',
        disponible: true
      };
    }
  }

  guardarComida(): void {
    if (this.isEditMode) {
      console.log('Actualizando comida:', this.comida);
    } else {
      console.log('Guardando nueva comida:', this.comida);
    }
    this.router.navigate(['/dashboard/comidas']);
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/comidas']);
  }
}