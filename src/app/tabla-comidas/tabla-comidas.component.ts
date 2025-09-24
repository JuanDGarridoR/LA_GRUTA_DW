import { Component, OnInit } from '@angular/core';
import { Comida, COMIDAS,} from '../models/comida/comida.model';
import { Categoria, CATEGORIAS } from '../models/categoria/categoria.model'; 

@Component({
  selector: 'app-tabla-comidas',
  templateUrl: './tabla-comidas.component.html',
  styleUrls: ['./tabla-comidas.component.css']
})
export class TablaComidasComponent implements OnInit {

  comidas: Comida[] = [];
  categorias: Categoria[] = [];

  ngOnInit(): void {
    // Cargar los datos quemados
    this.categorias = CATEGORIAS;
    this.comidas = COMIDAS;
  }
}
