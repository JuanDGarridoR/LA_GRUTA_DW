import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { HomeComponent } from './home/home.component';
import { PlatoEstrellaComponent } from './plato-estrella/plato-estrella.component';
import { MenuComponent } from './menu/menu.component';
import { TablaComidasComponent } from './tabla-comidas/tabla-comidas.component';
import { LoginComponent } from './Login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'plato-estrella', component: PlatoEstrellaComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'tabla-comidas', component: TablaComidasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' }, 
      { path: 'clientes', component: ClientesComponent },
      { path: 'comidas', component: ComidasComponent },
      { path: 'comidas/agregar', component: ComidasFormComponent },
      { path: 'comidas/editar/:id', component: ComidasFormComponent },
      { path: 'adicionales', component: AdicionalesComponent }
    ]
  },

  

  // otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
