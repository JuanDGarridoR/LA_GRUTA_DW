import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { PlatoEstrellaComponent } from './plato-estrella/plato-estrella.component';
import { MenuComponent } from './menu/menu.component';
import { TablaComidasComponent } from './tabla-comidas/tabla-comidas.component';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';
import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { PortalOperadorComponent } from './portal-operador/portal-operador.component';

import { RegisterComponent } from './register/register.component';
import { AdicionalFormComponent } from './dashboard/adicional-form/adicional-form.component';
import { CarroComponent } from './carro/carro.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { DomiciliariosComponent } from './dashboard/domiciliarios/domiciliarios.component';
import { DomiciliariosFormComponent } from './dashboard/domiciliarios-form/domiciliarios-form.component';
import { PedidosComponent } from './dashboard/pedidos/pedidos.component';


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
    DashboardComponent,
    ClientesComponent,
    ComidasComponent,
    AdicionalesComponent,
    ComidasFormComponent,
    PortalOperadorComponent,
    UserFormComponent,
    RegisterComponent,       
    AdicionalFormComponent, 
    CarroComponent, 
    PedidoDetalleComponent, 
    EditarPerfilComponent, DomiciliariosComponent, DomiciliariosFormComponent, PedidosComponent,     
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
