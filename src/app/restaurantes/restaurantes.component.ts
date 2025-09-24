import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent {
  sedes = [
    {
      nombre: 'La Gruta Nera - Chapinero',
      direccion: 'Calle 60 #10-25',
      telefono: '+57 300 192 8374',
      mapsUrl: 'https://www.google.com/maps/place/Cl.+60+%2310,+Chapinero,+Bogot%C3%A1/@4.6465892,-74.0661768,878m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e3f9a3875e95555:0x471f4d2e72bf5985!8m2!3d4.6465892!4d-74.0636019!16s%2Fg%2F11frt6dlfs?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      nombre: 'La Gruta Nera - Usaquén',
      direccion: 'Carrera 7 #116-30',
      telefono: '+57 300 987 6543',
      mapsUrl: 'https://www.google.com/maps/place/Ak+7+%23116-30,+Bogot%C3%A1/@4.6940139,-74.0357411,877m/data=!3m2!1e3!4b1!4m5!3m4!1s0x8e3f9aa64db53081:0xd499aa0ad2cb2702!8m2!3d4.6940139!4d-74.0331662?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      nombre: 'La Gruta Nera - Chicó norte',
      direccion: 'Calle 123 #12-34',
      telefono: '+57 300 123 4567',
      mapsUrl: 'https://www.google.com/maps/place/Cl.+140+%2312-50,+Bogot%C3%A1/@4.7201782,-74.0406165,877m/data=!3m2!1e3!4b1!4m5!3m4!1s0x8e3f855b9ac3c8b1:0xc41e0642b12b7cf7!8m2!3d4.7201782!4d-74.0380416?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D'
    }
  ];
}
