// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes principales (públicos)
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

// Componentes de usuario
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { PlatoEstrellaComponent } from './plato-estrella/plato-estrella.component';
import { MenuComponent } from './menu/menu.component';
import { TablaComidasComponent } from './tabla-comidas/tabla-comidas.component';
import { CarroComponent } from './carro/carro.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';

// Dashboard (admin)
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';
import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { AdicionalFormComponent } from './dashboard/adicional-form/adicional-form.component';
import { DomiciliariosComponent } from './dashboard/domiciliarios/domiciliarios.component';
import { DomiciliariosFormComponent } from './dashboard/domiciliarios-form/domiciliarios-form.component';
import { PedidosComponent } from './dashboard/pedidos/pedidos.component';

// Operador
import { PortalOperadorComponent } from './portal-operador/portal-operador.component';
import { OperadoresComponent } from './dashboard/operadores/operadores.component';

const routes: Routes = [
  // Redirección por defecto
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rutas públicas
  { path: 'home', component: HomeComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'plato-estrella', component: PlatoEstrellaComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'tabla-comidas', component: TablaComidasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Operador
  { path: 'operador/portal', component: PortalOperadorComponent },

  // Perfil y pedidos del usuario
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: 'carro', component: CarroComponent },
  { path: 'pedido/:id', component: PedidoDetalleComponent },
  { path: 'mis-pedidos', component: MisPedidosComponent },

  // Dashboard del administrador
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },

      // Clientes
      { path: 'operadores', component: OperadoresComponent },
      { path: 'operadores/nuevo', component: OperadoresComponent },
      { path: 'operadores/editar/:id', component: OperadoresComponent },

      // Comidas
      { path: 'comidas', component: ComidasComponent },
      { path: 'comidas/agregar', component: ComidasFormComponent },
      { path: 'comidas/editar/:id', component: ComidasFormComponent },

      // Adicionales
      { path: 'adicionales', component: AdicionalesComponent },
      { path: 'adicionales/nuevo', component: AdicionalFormComponent },
      { path: 'adicionales/editar/:id', component: AdicionalFormComponent },

      // Domiciliarios
      { path: 'domiciliarios', component: DomiciliariosComponent },
      { path: 'domiciliarios/nuevo', component: DomiciliariosFormComponent },
      { path: 'domiciliarios/editar/:id', component: DomiciliariosFormComponent },

      // Pedidos (admin)
      { path: 'pedidos', component: PedidosComponent },
    ],
  },

  // Ruta comodín
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
