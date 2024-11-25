import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddMedicComponent } from './components/add-medic/add-medic.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { MedicListComponent } from './components/medic-list/medic-list.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { authAdminGuard, authMedicGuard} from './guard/auth.guard';
import { MedicPageComponent } from './components/medic-page/medic-page.component';
import { AppointmentViewComponent } from './components/appointment-view/appointment-view.component';

const routes: Routes = [
  {path: 'log-in', component: LogInComponent},
  {path: 'main-page', component: MainPageComponent, canActivate: [authAdminGuard]},
  {path: 'list-medics', component: MedicListComponent,canActivate: [authAdminGuard]},
  {path: 'add-medic', component: AddMedicComponent,canActivate: [authAdminGuard]},
  {path: 'list-patients', component: ListPatientComponent,canActivate: [authAdminGuard]},
  {path: 'add-appointment', component: AddAppointmentComponent,canActivate: [authAdminGuard]},
  {path: 'add-patient', component: AddPatientComponent,canActivate: [authAdminGuard]},
  {path: 'medic-page/:matricula', component: MedicPageComponent, canActivate: [authMedicGuard]},
  {path: 'appointment-view/:appId', component: AppointmentViewComponent, canActivate: [authMedicGuard]},
  {path: '', redirectTo: 'log-in', pathMatch: 'full'},
  {path: '**', redirectTo: 'log-in'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
