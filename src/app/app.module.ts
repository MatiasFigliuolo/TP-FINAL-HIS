import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './nav/nav.component';
import { LogInComponent } from './log-in/log-in.component';
import { AddMedicComponent } from './add-medic/add-medic.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { MedicListComponent } from './medic-list/medic-list.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 


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
    AddAppointmentComponent
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
