import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren:'app/components/admin-module/dashboard/dashboard.module#DashboardModule',
    pathMatch: 'full',
    data: {
      title: 'Home'
    }
  },
  {
   path:'dashboard',
   loadChildren:'app/components/admin-module/dashboard/dashboard.module#DashboardModule',
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
