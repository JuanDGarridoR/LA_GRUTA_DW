import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// 🟢 Componentes principales (públicos)
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

// 🟣 Componentes de usuario
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { PlatoEstrellaComponent } from './plato-estrella/plato-estrella.component';
import { MenuComponent } from './menu/menu.component';
import { TablaComidasComponent } from './tabla-comidas/tabla-comidas.component';
import { CarroComponent } from './carro/carro.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';

// 🔴 Dashboard (admin)
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';
import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { AdicionalFormComponent } from './dashboard/adicional-form/adicional-form.component';
import { DomiciliariosComponent } from './dashboard/domiciliarios/domiciliarios.component';
import { DomiciliariosFormComponent } from './dashboard/domiciliarios-form/domiciliarios-form.component';
import { PedidosComponent } from './dashboard/pedidos/pedidos.component';

// 🟡 Operador
import { PortalOperadorComponent } from './portal-operador/portal-operador.component';


const routes: Routes = [
  // Redirección por defecto
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // 🟢 Rutas públicas
  { path: 'home', component: HomeComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'plato-estrella', component: PlatoEstrellaComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'tabla-comidas', component: TablaComidasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🟣 Portal del operador (solo OPERADOR)
  {
    path: 'operador/portal',
    component: PortalOperadorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['OPERADOR'] }
  },

  // 🔵 Perfil y pedidos del cliente (solo CLIENTE)
  {
    path: 'editar-perfil',
    component: EditarPerfilComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE'] }
  },
  {
    path: 'carro',
    component: CarroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE'] }
  },
  {
    path: 'pedido/:id',
    component: PedidoDetalleComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE'] }
  },
  {
    path: 'mis-pedidos',
    component: MisPedidosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE'] }
  },

  // 🔴 Dashboard del administrador (solo ADMIN)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
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

      // Pedidos (admin)
      { path: 'pedidos', component: PedidosComponent },
    ],
  },

  // Ruta comodín
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
