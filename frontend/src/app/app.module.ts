import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Modules - Essential Only
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Application Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Auth Components
import { LoginEnhancedComponent } from './components/auth/login/login-enhanced.component';
import { RegisterComponent } from './components/auth/register/register.component';

// Layout Components
import { HeaderEnhancedComponent } from './components/layout/header/header-enhanced.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

// Feature Components
import { DashboardEnhancedComponent } from './components/dashboard/dashboard-enhanced.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { MetersComponent } from './components/meters/meters.component';
import { MeterFormComponent } from './components/meters/meter-form/meter-form.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ContractFormComponent } from './components/contracts/contract-form/contract-form.component';
import { RechargesComponent } from './components/recharges/recharges.component';
import { RechargeFormComponent } from './components/recharges/recharge-form/recharge-form.component';
import { ConsumptionsComponent } from './components/consumptions/consumptions.component';
import { ConsumptionFormComponent } from './components/consumptions/consumption-form/consumption-form.component';
import { UsersComponent } from './components/users/users.component';
import { PendingAdminsComponent } from './components/pending-admins/pending-admins.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { ReportsComponent } from './components/reports/reports.component';

// Services
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';
import { CustomerService } from './services/customer.service';
import { MeterService } from './services/meter.service';
import { ContractService } from './services/contract.service';
import { RechargeService } from './services/recharge.service';
import { ConsumptionService } from './services/consumption.service';
import { UserService } from './services/user.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginEnhancedComponent,
    RegisterComponent,
    HeaderEnhancedComponent,
    SidebarComponent,
    DashboardEnhancedComponent,
    CustomersComponent,
    CustomerFormComponent,
    MetersComponent,
    MeterFormComponent,
    ContractsComponent,
    ContractFormComponent,
    RechargesComponent,
    RechargeFormComponent,
    ConsumptionsComponent,
    ConsumptionFormComponent,
    UsersComponent,
    PendingAdminsComponent,
    ToastComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    // Essential Angular Material Modules Only
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    CustomerService,
    MeterService,
    ContractService,
    RechargeService,
    ConsumptionService,
    UserService,
    ToastService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
