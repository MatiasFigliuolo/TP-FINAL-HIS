import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddMedicComponent } from './add-medic/add-medic.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { MedicListComponent } from './medic-list/medic-list.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'list-medics', component: MedicListComponent },
  { path: 'list-patients', component: ListPatientComponent },
  { path: 'add-medic', component: AddMedicComponent },
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: '', redirectTo: 'log-in', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'main-page' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
