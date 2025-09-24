import { Component, OnInit } from '@angular/core';
// Importamos tu modelo de datos.
import { Comida, COMIDAS } from '../../models/comida/comida.model';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.css']
})
export class ComidasComponent implements OnInit {

  // Esta propiedad almacenará la lista de comidas para mostrar en la tabla.
  comidas: Comida[] = [];

  constructor() { }

  // ngOnInit es un método que se ejecuta automáticamente cuando el componente se inicia.
  // Es el lugar perfecto para cargar los datos iniciales.
  ngOnInit(): void {
    this.comidas = COMIDAS; // Cargamos los datos quemados desde tu archivo de modelo.
  }

  /**
   * Elimina una comida de la lista después de pedir confirmación.
   * @param id El ID de la comida a eliminar.
   */
  eliminarComida(id: number | undefined): void {
    // Si no hay un ID, no hacemos nada.
    if (!id) return;

    // 1. Mostramos un diálogo de confirmación al usuario.
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta comida? Esta acción no se puede deshacer.');

    // 2. Si el usuario confirma, procedemos a eliminar.
    if (confirmacion) {
      // 3. Usamos .filter() para crear un nuevo arreglo que excluye la comida con el id a eliminar.
      this.comidas = this.comidas.filter(comida => comida.id !== id);
      console.log(`Comida con ID: ${id} eliminada de la vista.`);
    }
  }
}