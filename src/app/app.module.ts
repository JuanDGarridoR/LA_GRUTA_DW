import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { PlatoEstrellaComponent } from './plato-estrella/plato-estrella.component';
import { MenuComponent } from './menu/menu.component';
import { TablaComidasComponent } from './tabla-comidas/tabla-comidas.component';
import { LoginComponent } from './Login/login.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';
import { ComidasComponent } from './dashboard/comidas/comidas.component';
import { AdicionalesComponent } from './dashboard/adicionales/adicionales.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { ComidasFormComponent } from './dashboard/comidas-form/comidas-form.component';
import { PortalOperadorComponent } from './portal-operador/portal-operador.component';
import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { AdicionalFormComponent } from './dashboard/adicional-form/adicional-form.component';
import { CommonModule } from '@angular/common';

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
    CrearCuentaComponent,
    ComidasFormComponent,
    PortalOperadorComponent,
    UserFormComponent,
    AdicionalFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
