import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plato-estrella',
  templateUrl: './plato-estrella.component.html',
  styleUrls: ['./plato-estrella.component.css']
})
export class PlatoEstrellaComponent implements OnInit {

  galleryImages: string[] = [
    'assets/images/pizza-nera-con-calamari-e-gamberi-ricetta.webp',
    'assets/images/pizzaa_neraa.jpeg',
    'assets/images/pizzaNera.webp'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
