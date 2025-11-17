// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';          
import { RouterModule } from '@angular/router';        
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Fragments / layout
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

// Usuario
import { CarroComponent } from './carro/carro.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
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
import { OperadoresFormComponent } from './dashboard/operadores/operadoresform/operadorsform.componet';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RestaurantesComponent,
    PlatoEstrellaComponent,
    MenuComponent,
    TablaComidasComponent,
    LoginComponent,
    RegisterComponent,

    // usuario
    CarroComponent,
    PedidoDetalleComponent,
    EditarPerfilComponent,
    MisPedidosComponent,

    // dashboard
    DashboardComponent,
    ComidasComponent,
    AdicionalesComponent,
    ComidasFormComponent,
    UserFormComponent,
    AdicionalFormComponent,
    DomiciliariosComponent,
    DomiciliariosFormComponent,
    PedidosComponent,

    // operador
    PortalOperadorComponent,
    OperadoresComponent,
    OperadoresFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,            // ✅ Pipes/directivas comunes
    RouterModule,            // ✅ routerLink / router-outlet
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
    multi: true
  }
],

  bootstrap: [AppComponent],
})
export class AppModule {}
