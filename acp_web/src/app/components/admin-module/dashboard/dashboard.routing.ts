import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {EmployeeListComponent} from '../employee/employee-list/employee-list.component';
import {EmployeeCreateComponent} from '../employee/employee-create/employee-create.component';
import {EmployeeUpdateComponent} from '../employee/employee-update/employee-update.component';

import {UploadEmployeeComponent} from '../employee/upload-employee/upload-employee.component';


const routesDashboard: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'employee/list',
    component: EmployeeListComponent
  },
  {
    path: 'employee/create',
    component: EmployeeCreateComponent
  },
  {
    path: 'employee/upload',
    component: UploadEmployeeComponent
  },
  {
    path:'employee/update',
    component: EmployeeUpdateComponent
  }
];

export const RoutingDashboardPage = RouterModule.forChild(routesDashboard);
