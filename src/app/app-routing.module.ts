import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes principales
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

// Componentes del dashboard (admin)
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';
import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { AdicionalFormComponent } from './dashboard/adicional-form/adicional-form.component';
import { DomiciliariosComponent } from './dashboard/domiciliarios/domiciliarios.component';
import { DomiciliariosFormComponent } from './dashboard/domiciliarios-form/domiciliarios-form.component';

// Componente operador
import { PortalOperadorComponent } from './portal-operador/portal-operador.component';
import { PedidosComponent } from './dashboard/pedidos/pedidos.component';

const routes: Routes = [
  // Redirección por defecto
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Páginas públicas
  { path: 'home', component: HomeComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'plato-estrella', component: PlatoEstrellaComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'tabla-comidas', component: TablaComidasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Portal del operador
  { path: 'operador/portal', component: PortalOperadorComponent },

  // Perfil y pedidos del usuario
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: 'carro', component: CarroComponent },
  { path: 'pedido/:id', component: PedidoDetalleComponent },

  // Dashboard del administrador
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },

      // Clientes
      { path: 'clientes', component: ClientesComponent },
      { path: 'clientes/nuevo', component: UserFormComponent },
      { path: 'clientes/editar/:id', component: UserFormComponent },

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
