import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddMedicComponent } from './add-medic/add-medic.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { MedicListComponent } from './medic-list/medic-list.component';

const routes: Routes = [
  {path: 'log-in', component: LogInComponent},
  {path: 'main-page', component: MainPageComponent},
  {path: 'list-medics', component: MedicListComponent},
  {path: 'add-medic', component: AddMedicComponent},
  {path: 'add-patient', component: AddPatientComponent},
  {path: '', redirectTo: 'log-in', pathMatch: 'full'},
  {path: '* *', component: PageTransitionEvent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
