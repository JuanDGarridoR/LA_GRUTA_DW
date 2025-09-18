import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TransparentHeaderComponent } from './fragments/transparent-header/transparent-header.component';
import { SolidHeaderComponent } from './fragments/solid-header/solid-header.component';
import { NoLoginHeaderComponent } from './fragments/no-login-header/no-login-header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';

@NgModule({
  declarations: [
    AppComponent,
    TransparentHeaderComponent,
    SolidHeaderComponent,
    NoLoginHeaderComponent,
    FooterComponent,
    HomeComponent,
    RestaurantesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
