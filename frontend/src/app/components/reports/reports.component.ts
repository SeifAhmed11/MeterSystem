import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MeterService } from '../../services/meter.service';
import { ContractService } from '../../services/contract.service';
import { RechargeService } from '../../services/recharge.service';
import { ConsumptionService } from '../../services/consumption.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  isLoading = false;
  selectedReport = '';
  reportData: any[] = [];
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  Math = Math; // إضافة Math للـ template
  Array = Array; // إضافة Array للـ template

  reports = [
    { id: 'customers', name: 'تقرير العملاء', endpoint: '/customer' },
    { id: 'meters', name: 'تقرير العدادات', endpoint: '/meter' },
    { id: 'contracts', name: 'تقرير العقود', endpoint: '/contract' },
    { id: 'recharges', name: 'تقرير الشحنات', endpoint: '/recharge' },
    { id: 'consumptions', name: 'تقرير الاستهلاك', endpoint: '/consumption' },
    { id: 'users', name: 'تقرير المستخدمين', endpoint: '/user' }
  ];

  constructor(
    private customerService: CustomerService,
    private meterService: MeterService,
    private contractService: ContractService,
    private rechargeService: RechargeService,
    private consumptionService: ConsumptionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onReportChange(reportId: string): void {
    this.selectedReport = reportId;
    this.currentPage = 1;
    this.generateReport();
  }

  generateReport(): void {
    if (!this.selectedReport) return;

    this.isLoading = true;
    this.reportData = [];

    const params = {
      page: this.currentPage,
      pageSize: this.pageSize,
      search: this.searchTerm || undefined
    };

    switch (this.selectedReport) {
      case 'customers':
        this.customerService.getCustomers(params).subscribe({
          next: (response) => {
            this.reportData = response.data;
            this.totalItems = response.pagination.totalItems;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
        break;

      case 'meters':
        this.meterService.getMeters(params).subscribe({
          next: (response) => {
            this.reportData = response.data;
            this.totalItems = response.pagination.totalItems;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
        break;

      case 'contracts':
        this.contractService.getContracts(params).subscribe({
          next: (response) => {
            this.reportData = response.data;
            this.totalItems = response.pagination.totalItems;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
        break;

      case 'recharges':
        this.rechargeService.getRecharges(params).subscribe({
          next: (response) => {
            this.reportData = response.data;
            this.totalItems = response.pagination.totalItems;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
        break;

      case 'consumptions':
        this.consumptionService.getConsumptions(params).subscribe({
          next: (response) => {
            this.reportData = response.data;
            this.totalItems = response.pagination.totalItems;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
        break;

      case 'users':
        this.userService.getUsers(params).subscribe({
          next: (response) => {
            this.reportData = response.data;
            this.totalItems = response.pagination.totalItems;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
        break;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.generateReport();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.generateReport();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.generateReport();
  }

  exportToCSV(): void {
    if (this.reportData.length === 0) return;

    const headers = Object.keys(this.reportData[0]);
    const csvContent = [
      headers.join(','),
      ...this.reportData.map(row => 
        headers.map(header => String(row[header] ?? '')).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.selectedReport}_report.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getReportColumns(): string[] {
    if (this.reportData.length === 0) return [];
    return Object.keys(this.reportData[0]);
  }

  getColumnDisplayName(column: string): string {
    const columnNames: { [key: string]: string } = {
      id: 'المعرف',
      nationalId: 'الرقم القومي',
      name: 'الاسم',
      address: 'العنوان',
      serial: 'الرقم التسلسلي',
      type: 'النوع',
      installedDate: 'تاريخ التركيب',
      createdAt: 'تاريخ الإنشاء',
      updatedAt: 'تاريخ التحديث',
      isAvailable: 'متاح',
      customerName: 'اسم العميل',
      status: 'الحالة',
      amount: 'المبلغ',
      date: 'التاريخ',
      email: 'البريد الإلكتروني',
      userName: 'اسم المستخدم',
      roles: 'الصلاحيات'
    };
    return columnNames[column] || column;
  }
}
