import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


import { AppComponent } from './app.component';
import { VaikuRegistracijaComponent } from './vaiku-registracija/vaiku-registracija.component';
import { RegistrationsListComponent } from './registrations-list/registrations-list.component';


@NgModule({
  declarations: [
    AppComponent,
    VaikuRegistracijaComponent,
    RegistrationsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
