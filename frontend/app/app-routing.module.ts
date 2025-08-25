import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

// Components
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent } from './components/customers/customers.component';
import { MetersComponent } from './components/meters/meters.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { RechargesComponent } from './components/recharges/recharges.component';
import { ConsumptionsComponent } from './components/consumptions/consumptions.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  // Public Routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Protected Routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: DashboardComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'meters', component: MetersComponent },
      { path: 'contracts', component: ContractsComponent },
      { path: 'recharges', component: RechargesComponent },
      { path: 'consumptions', component: ConsumptionsComponent },
      { 
        path: 'users', 
        component: UsersComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'SuperAdmin'] }
      }
    ]
  },
  
  // Fallback Route
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }





