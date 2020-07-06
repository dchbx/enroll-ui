import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AgencyStaffUiModule } from '@hbx/admin/shared/ui-components';

import { AgencyStaffDetailComponent } from './agency-staff-detail.component';
import { StaffDemographicsComponent } from './staff-demographics/staff-demographics.component';

const routes: Routes = [{ path: '', component: AgencyStaffDetailComponent }];

@NgModule({
  declarations: [AgencyStaffDetailComponent, StaffDemographicsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AgencyStaffUiModule,
  ],
})
export class AgencyStaffDetailModule {}
