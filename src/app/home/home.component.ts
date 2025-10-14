import { Component, OnInit } from '@angular/core';
import { Categoria, CATEGORIAS } from '../models/categoria/categoria.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role = '';
  username = '';
  categorias: Categoria[] = [];

  slides = [
    { img: 'assets/images/REC-283110_Pizza.webp', alt: 'Interior del restaurante', titulo: 'La Gruta', subtitulo: 'Restaurante italiano tradicional en Bogotá' },
    { img: 'assets/images/pasta-en-el-cine-1024x683.jpg', alt: 'Plato de pasta', titulo: 'Sabor Auténtico', subtitulo: 'Platos preparados con ingredientes frescos' },
    { img: 'assets/images/Gastronomia-Italiana-1030x580.jpeg', alt: 'Pizza artesanal', titulo: 'Pasta Artesanal', subtitulo: 'Receta tradicional con un toque moderno' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.categorias = CATEGORIAS;
    this.loadUserData();
  }

  private loadUserData(): void {
    this.role = localStorage.getItem('role') || '';
    this.username = localStorage.getItem('username') || '';
  }

  scrollToCategoria(event: Event, slug: string) {
    event.preventDefault();
    this.router.navigate(['/menu']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(slug);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }
}
