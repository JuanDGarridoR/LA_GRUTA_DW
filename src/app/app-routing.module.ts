// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Públicas
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { PlatoEstrellaComponent } from './plato-estrella/plato-estrella.component';
import { MenuComponent } from './menu/menu.component';
import { TablaComidasComponent } from './tabla-comidas/tabla-comidas.component';

// Usuario
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { CarroComponent } from './carro/carro.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';

import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { AdicionalFormComponent } from './dashboard/adicional-form/adicional-form.component';

import { DomiciliariosComponent } from './dashboard/domiciliarios/domiciliarios.component';
import { DomiciliariosFormComponent } from './dashboard/domiciliarios-form/domiciliarios-form.component';

import { AdministradoresComponent } from './dashboard/administradores/administradores.component';
import { AdministradoresFormComponent } from './dashboard/administradores-form/administradores-form.component';

import { OperadoresComponent } from './dashboard/operadores/operadores.component';
import { OperadoresFormComponent } from './dashboard/operadores-form/operadores-form.component';

import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { ClientesFormComponent } from './dashboard/clientes-form/clientes-form.component';

import { PedidosComponent } from './dashboard/pedidos/pedidos.component';

// Portal operador
import { PortalOperadorComponent } from './portal-operador/portal-operador.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Públicas
  { path: 'home', component: HomeComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'plato-estrella', component: PlatoEstrellaComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'tabla-comidas', component: TablaComidasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Usuario normal
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: 'carro', component: CarroComponent },
  { path: 'pedido/:id', component: PedidoDetalleComponent },
  { path: 'mis-pedidos', component: MisPedidosComponent },

  // Portal operador
  { path: 'operador/portal', component: PortalOperadorComponent },

  // Dashboard Admin
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },

      // CRUD CLIENTES
      { path: 'clientes', component: ClientesComponent },
      { path: 'clientes/nuevo', component: ClientesFormComponent },
      { path: 'clientes/editar/:id', component: ClientesFormComponent },

      // CRUD OPERADORES
      { path: 'operadores', component: OperadoresComponent },
      { path: 'operadores/nuevo', component: OperadoresFormComponent },
      { path: 'operadores/editar/:id', component: OperadoresFormComponent },

      // CRUD ADMINISTRADORES
      { path: 'administradores', component: AdministradoresComponent },
      { path: 'administradores/nuevo', component: AdministradoresFormComponent },
      { path: 'administradores/editar/:id', component: AdministradoresFormComponent },

      // CRUD COMIDAS
      { path: 'comidas', component: ComidasComponent },
      { path: 'comidas/agregar', component: ComidasFormComponent },
      { path: 'comidas/editar/:id', component: ComidasFormComponent },

      // CRUD ADICIONALES
      { path: 'adicionales', component: AdicionalesComponent },
      { path: 'adicionales/nuevo', component: AdicionalFormComponent },
      { path: 'adicionales/editar/:id', component: AdicionalFormComponent },

      // CRUD DOMICILIARIOS
      { path: 'domiciliarios', component: DomiciliariosComponent },
      { path: 'domiciliarios/nuevo', component: DomiciliariosFormComponent },
      { path: 'domiciliarios/editar/:id', component: DomiciliariosFormComponent },

      // PEDIDOS
      { path: 'pedidos', component: PedidosComponent },
    ],
  },

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
