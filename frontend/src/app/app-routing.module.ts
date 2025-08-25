import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { PendingAdminsComponent } from './components/pending-admins/pending-admins.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  { path: 'login', component: LoginEnhancedComponent },
  { path: 'register', component: RegisterComponent },
  
  { 
    path: 'dashboard', 
    component: DashboardEnhancedComponent, 
    canActivate: [AuthGuard] 
  },
  
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
  
  { 
    path: 'pending-admins', 
    component: PendingAdminsComponent, 
    canActivate: [AuthGuard]
  },
  
  { 
    path: 'reports', 
    component: ReportsComponent, 
    canActivate: [AuthGuard]
  },
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




