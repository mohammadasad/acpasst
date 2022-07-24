import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DashboardComponent} from './dashboard.component';
import { RoutingDashboardPage } from './dashboard.routing';
import {EmployeeListComponent} from '../employee/employee-list/employee-list.component';
import {EmployeeCreateComponent} from '../employee/employee-create/employee-create.component';
import {EmployeeUpdateComponent} from '../employee/employee-update/employee-update.component';

import { CommonModule } from '@angular/common';

import {UploadEmployeeComponent} from '../employee/upload-employee/upload-employee.component';


@NgModule({
    declarations: [
        DashboardComponent,
        EmployeeCreateComponent,
        EmployeeListComponent,
        EmployeeUpdateComponent,
        UploadEmployeeComponent
    ],
    imports: [
        CommonModule,
	    FormsModule,
        RoutingDashboardPage,
        ReactiveFormsModule
    ]
  })
 export class DashboardModule {}
