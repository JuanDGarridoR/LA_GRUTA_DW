// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';

// Públicas
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { PlatoEstrellaComponent } from './plato-estrella/plato-estrella.component';
import { MenuComponent } from './menu/menu.component';
import { TablaComidasComponent } from './tabla-comidas/tabla-comidas.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Usuario normal
import { CarroComponent } from './carro/carro.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { ClientesFormComponent } from './dashboard/clientes-form/clientes-form.component';

import { OperadoresComponent } from './dashboard/operadores/operadores.component';
import { OperadoresFormComponent } from './dashboard/operadores-form/operadores-form.component';

import { AdministradoresComponent } from './dashboard/administradores/administradores.component';
import { AdministradoresFormComponent } from './dashboard/administradores-form/administradores-form.component';

import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';

import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { AdicionalFormComponent } from './dashboard/adicional-form/adicional-form.component';

import { DomiciliariosComponent } from './dashboard/domiciliarios/domiciliarios.component';
import { DomiciliariosFormComponent } from './dashboard/domiciliarios-form/domiciliarios-form.component';

import { PedidosComponent } from './dashboard/pedidos/pedidos.component';

// Portal operador
import { PortalOperadorComponent } from './portal-operador/portal-operador.component';

// Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,

    // Layout
    HeaderComponent,
    FooterComponent,

    // Públicas
    HomeComponent,
    RestaurantesComponent,
    PlatoEstrellaComponent,
    MenuComponent,
    TablaComidasComponent,
    LoginComponent,
    RegisterComponent,

    // Usuario normal
    CarroComponent,
    PedidoDetalleComponent,
    EditarPerfilComponent,
    MisPedidosComponent,

    // Dashboard
    DashboardComponent,
    ClientesComponent,
    ClientesFormComponent,
    OperadoresComponent,
    OperadoresFormComponent,
    AdministradoresComponent,
    AdministradoresFormComponent,
    ComidasComponent,
    ComidasFormComponent,
    AdicionalesComponent,
    AdicionalFormComponent,
    DomiciliariosComponent,
    DomiciliariosFormComponent,
    PedidosComponent,

    // Portal Operador
    PortalOperadorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
