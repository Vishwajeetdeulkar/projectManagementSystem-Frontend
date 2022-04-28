import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'welcome',
    pathMatch:'full'
  },
  {
    path:'welcome',
    component:WelcomeComponent,
    pathMatch:'full'
  },
  {
    path:'managerLogin',
    component:ManagerLoginComponent,
    pathMatch:'full'
  },
  {
    path:'employeeLogin',
    component:EmployeeLoginComponent,
    pathMatch:'full'
  },
  {
    path:'adminLogin',
    component:AdminLoginComponent,
    pathMatch:'full'
  },
  {
    path:'employeeDashboard',
    component:EmployeeDashboardComponent,
    pathMatch:'full',
    canActivate:[AuthenticationGuard]
  },
  {
    path:'managerDashboard',
    component:ManagerDashboardComponent,
    pathMatch:'full',
    canActivate:[AuthenticationGuard]
  },
  {
    path:'adminDashboard',
    component:AdminDashboardComponent,
    pathMatch:'full',
    canActivate:[AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
