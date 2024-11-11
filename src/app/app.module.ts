import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from './services/patient.service';

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
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
