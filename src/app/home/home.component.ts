import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categorias = [
    { nombre: 'Antipastos', img: 'assets/images/bruschetta.jpg', alt: 'Imagen de antipasto italiano.', link: '/menu#antipastos' },
    { nombre: 'Pizzas', img: 'assets/images/pizzaNera.webp', alt: 'Imagen de una pizza italiana.', link: '/menu#pizzas' },
    { nombre: 'Pastas', img: 'assets/images/pasta_carbonara.jpg', alt: 'Imagen de un plato de pasta italiana.', link: '/menu#pastas' },
    { nombre: 'Risottos', img: 'assets/images/risotoAlTartufo.avif', alt: 'Imagen de risotto italiano.', link: '/menu#risottos' },
    { nombre: 'Postres', img: 'assets/images/tiramisu.jpg', alt: 'Imagen de un postre italiano.', link: '/menu#postres' },
    { nombre: 'Bebidas', img: 'assets/images/Bebidas.png', alt: 'Imagen de bebidas.', link: '/menu#bebidas' },
  ];
}
