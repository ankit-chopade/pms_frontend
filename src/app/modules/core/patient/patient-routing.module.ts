import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientPortalScreenComponent } from './patient-portal-screen/patient-portal-screen.component';
import { DiagnosisComponent } from './patient-visit/diagnosis/diagnosis.component';
import { MedicationsComponent } from './patient-visit/medications/medications.component';
import { PatientDemographicsDetailsComponent } from './patient-visit/patient-demographics-details/patient-demographics-details.component';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { ProcedureComponent } from './patient-visit/procedure/procedure.component';
import { VitalSignsComponent } from './patient-visit/vital-signs/vital-signs.component';

const routes: Routes = [

  {
    path: 'patient-details',
    component: PatientDetailsComponent
  },
  {
    path: 'patient-visit',
    component: PatientVisitComponent,
    children: [{
      path: '', redirectTo: 'patient-details', pathMatch: 'full'
    },
    {
      path: 'diagnosis',
      // loadChildren: () => import('./patient-visit/diagnosis/').then((m) => m.DiagnosisComponent)
      component: DiagnosisComponent
    },
    {
      path: 'patient-details',
      component: PatientDemographicsDetailsComponent
    },
    {
      path: 'procedures',
      component: ProcedureComponent
    },
    {
      path: 'vital-signs',
      component: VitalSignsComponent
    },
    {
      path: 'medications',
      component: MedicationsComponent
    }
    ]
  },
  {
    path: 'portal-screen',
    component: PatientPortalScreenComponent,
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule {
  constructor() {
  }

}
