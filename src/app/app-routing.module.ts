import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { HomeComponent } from './home/home.component';
import { PlatoEstrellaComponent } from './plato-estrella/plato-estrella.component';
import { MenuComponent } from './menu/menu.component';
import { TablaComidasComponent } from './tabla-comidas/tabla-comidas.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';
import { PortalOperadorComponent } from './portal-operador/portal-operador.component';
import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { AdicionalFormComponent } from './dashboard/adicional-form/adicional-form.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'restaurantes', component: RestaurantesComponent },
{ path: 'plato-estrella', component: PlatoEstrellaComponent },
{ path: 'menu', component: MenuComponent },
{ path: 'tabla-comidas', component: TablaComidasComponent },
{ path: 'login', component: LoginComponent },
{ path: 'operador/portal', component: PortalOperadorComponent },
{ path: 'register', component: RegisterComponent },


{
path: 'dashboard',
component: DashboardComponent,
children: [
{ path: '', redirectTo: 'clientes', pathMatch: 'full' },


  // Rutas de clientes
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/nuevo', component: UserFormComponent },
  { path: 'clientes/editar/:id', component: UserFormComponent },

  // Rutas de comidas
  { path: 'comidas', component: ComidasComponent },
  { path: 'comidas/agregar', component: ComidasFormComponent },
  { path: 'comidas/editar/:id', component: ComidasFormComponent },

  // Rutas de adicionales
  { path: 'adicionales', component: AdicionalesComponent },
  { path: 'adicionales/nuevo', component: AdicionalFormComponent },
  { path: 'adicionales/editar/:id', component: AdicionalFormComponent },
],


},

// Ruta comodín para redirigir a home
{ path: '**', redirectTo: '/home' },
];

@NgModule({
imports: [
RouterModule.forRoot(routes, {
anchorScrolling: 'enabled',
scrollPositionRestoration: 'enabled',
}),
],
exports: [RouterModule],
})
export class AppRoutingModule {}
