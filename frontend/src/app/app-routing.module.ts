import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { LoginEnhancedComponent } from './components/auth/login/login-enhanced.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardEnhancedComponent } from './components/dashboard/dashboard-enhanced.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { MetersComponent } from './components/meters/meters.component';
import { MeterFormComponent } from './components/meters/meter-form/meter-form.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ContractFormComponent } from './components/contracts/contract-form/contract-form.component';
import { RechargesComponent } from './components/recharges/recharges.component';
import { RechargeFormComponent } from './components/recharges/recharge-form/recharge-form.component';
// Removed: Consumptions, Users
import { PendingAdminsComponent } from './components/pending-admins/pending-admins.component';

const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginEnhancedComponent },
  { path: 'register', component: RegisterComponent },
  
  // Protected routes
  { 
    path: 'dashboard', 
    component: DashboardEnhancedComponent, 
    canActivate: [AuthGuard] 
  },
  
  // Customers routes
  { 
    path: 'customers', 
    component: CustomersComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'customers/new', 
    component: CustomerFormComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'customers/edit/:id', 
    component: CustomerFormComponent, 
    canActivate: [AuthGuard]
  },
  
  // Meters routes
  { 
    path: 'meters', 
    component: MetersComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'meters/new', 
    component: MeterFormComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'meters/edit/:id', 
    component: MeterFormComponent, 
    canActivate: [AuthGuard]
  },
  
  // Contracts routes
  { 
    path: 'contracts', 
    component: ContractsComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'contracts/new', 
    component: ContractFormComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'contracts/edit/:id', 
    component: ContractFormComponent, 
    canActivate: [AuthGuard]
  },
  
  // Recharges routes
  { 
    path: 'recharges', 
    component: RechargesComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'recharges/new', 
    component: RechargeFormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'recharges/edit/:id', 
    component: RechargeFormComponent, 
    canActivate: [AuthGuard]
  },
  
  // Removed Consumptions & Users routes
  
  // Pending Admins routes
  { 
    path: 'pending-admins', 
    component: PendingAdminsComponent, 
    canActivate: [AuthGuard]
  },
  
  // Default routes
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




