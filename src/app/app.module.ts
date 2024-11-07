import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './nav/nav.component';
import { LogInComponent } from './log-in/log-in.component';
import { AddMedicComponent } from './add-medic/add-medic.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { MedicListComponent } from './medic-list/medic-list.component';
import { ListPatientComponent } from './list-patient/list-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavComponent,
    LogInComponent,
    AddMedicComponent,
    AddPatientComponent,
    MedicListComponent,
    ListPatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  // Este módulo es para formularios de plantilla
    ReactiveFormsModule  // Este módulo es para formularios reactivos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
