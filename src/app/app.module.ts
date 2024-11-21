import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavComponent } from './components/nav/nav.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AddMedicComponent } from './components/add-medic/add-medic.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { MedicListComponent } from './components/medic-list/medic-list.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MedicPageComponent } from './components/medic-page/medic-page.component';



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
    AddAppointmentComponent,
    MedicPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
     FullCalendarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
