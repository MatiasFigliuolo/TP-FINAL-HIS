import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddMedicComponent } from './add-medic/add-medic.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { MedicListComponent } from './medic-list/medic-list.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { authAdminGuard} from './guard/auth.guard';

const routes: Routes = [
  {path: 'log-in', component: LogInComponent},
  {path: 'main-page', component: MainPageComponent, canActivate: [authAdminGuard]},
  {path: 'list-medics', component: MedicListComponent,canActivate: [authAdminGuard]},
  {path: 'add-medic', component: AddMedicComponent,canActivate: [authAdminGuard]},
  {path: 'list-patients', component: ListPatientComponent,canActivate: [authAdminGuard]},
  {path: 'add-appointment', component: AddAppointmentComponent,canActivate: [authAdminGuard]},
  {path: 'add-patient', component: AddPatientComponent,canActivate: [authAdminGuard]},
  {path: '', redirectTo: 'log-in', pathMatch: 'full'},
  {path: '**', redirectTo: 'log-in'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
