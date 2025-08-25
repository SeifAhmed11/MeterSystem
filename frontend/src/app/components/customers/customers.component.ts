import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService, CustomerDto } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  template: `
    <div class="customers-container">
      <div class="page-header">
        <div class="brand">
          <i class="fas fa-users"></i>
          <div>
            <h1>إدارة العملاء</h1>
            <p>عرض العملاء والبحث بالرقم القومي</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-refresh" (click)="loadAll()" [disabled]="loading">
            <i class="fas fa-sync-alt" [class.fa-spin]="loading"></i>
            تحديث
          </button>
          <button class="btn-all-h" (click)="loadAll()" [disabled]="loading">
            <i class="fas fa-list"></i>
            الكل
          </button>
        </div>
      </div>

      <div class="grid">
        <div class="card-simple">
          <h3 class="card-title">بحث بالرقم القومي</h3>
          <form [formGroup]="queryForm" class="form">
            <div class="form-group">
              <label>National ID</label>
              <input class="form-input" formControlName="nationalId" placeholder="12345677" />
            </div>
            <div class="actions">
              <button type="button" class="btn-search" (click)="search()" [disabled]="loading || !queryForm.value.nationalId">
                <i class="fas fa-search"></i>
                بحث
              </button>
              <button type="button" class="btn-all" (click)="loadAll()" [disabled]="loading">
                <i class="fas fa-list"></i>
                الكل
              </button>
            </div>
          </form>
        </div>

        <div class="card-simple">
          <h3 class="card-title">بيانات العملاء</h3>
          <div class="table-container simple scrollable">
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الرقم القومي</th>
                  <th>العنوان</th>
                  <th>عدد العقود</th>
                  <th>تاريخ الإنشاء</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let c of customers">
                  <td>{{c.name}}</td>
                  <td>{{c.nationalId}}</td>
                  <td>{{c.address}}</td>
                  <td>{{c.numberOfContracts ?? '—'}}</td>
                  <td>{{c.createdAt | date:'short'}}</td>
                </tr>
                <tr *ngIf="!loading && customers.length === 0">
                  <td colspan="5" class="empty">لا توجد بيانات</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .customers-container { padding: 16px; }
    .page-header { margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid var(--border-color); border-radius: 12px; padding: 12px 16px; box-shadow: var(--shadow-sm); flex-wrap: wrap; gap: 8px; }
    .brand { display: flex; gap: 10px; align-items: center; }
    .brand i { color: var(--primary-color); font-size: 20px; }
    .brand h1 { margin: 0; font-size: 18px; color: #000; }
    .brand p { margin: 2px 0 0; color: var(--text-secondary); font-size: 0.9rem; }
    .header-actions { display: flex; gap: 8px; }
    .btn-refresh, .btn-all-h { height: 34px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; padding: 0 12px; font-weight: 600; cursor: pointer; transition: var(--transition); border: 1px solid var(--border-color); }
    .btn-refresh { background: var(--primary-color); color: #fff; }
    .btn-refresh:hover { background: var(--primary-dark); }
    .btn-refresh:disabled, .btn-all-h:disabled { opacity: 0.7; cursor: not-allowed; }
    .btn-all-h { background: #fff; color: var(--text-primary); }
    .btn-all-h:hover { border-color: var(--primary-color); color: var(--primary-color); }

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
    .card-simple { background: #fff; border: 1px solid var(--border-color); border-radius: 12px; padding: 12px; box-shadow: var(--shadow-sm); }
    .card-title { margin: 0 0 10px; color: #000; font-size: 16px; }
    .form { display: flex; flex-direction: column; gap: 10px; }
    .form-group label { display: block; margin-bottom: 4px; font-weight: 600; color: #000; font-size: 0.9rem; }
    .form-input { width: 100%; padding: 8px 10px; border: 1.5px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; background: #fff; }
    .form-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(227,30,38,0.08); }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn-search, .btn-all { height: 36px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; padding: 0 12px; font-weight: 600; cursor: pointer; transition: var(--transition); }
    .btn-search { background: var(--primary-color); color: #fff; border: 1px solid var(--border-color); }
    .btn-search:hover { background: var(--primary-dark); }
    .btn-all { background: #fff; color: var(--text-primary); border: 1px solid var(--border-color); }
    .btn-all:hover { border-color: var(--primary-color); color: var(--primary-color); }

    .table-container.simple { border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; background: #fff; }
    .table-container.scrollable { max-height: 60vh; overflow: auto; }
    table { width: 100%; border-collapse: collapse; }
    thead th { text-align: right; background: #f4f5f7; border-bottom: 1px solid var(--border-color); padding: 10px; font-weight: 700; font-size: 0.9rem; color: #000; white-space: nowrap; position: sticky; top: 0; z-index: 1; }
    tbody td { padding: 10px; border-bottom: 1px solid var(--border-color); font-size: 0.95rem; color: #000; background: #fff; min-width: 160px; }
    tbody tr:nth-child(even) td { background: #fbfbfc; }
    tbody tr:hover td { background: #f1f5f9; }
    .empty { text-align: center; color: var(--text-secondary); background: #fff; }
  `]
})
export class CustomersComponent implements OnInit {
  loading = false;
  customers: CustomerDto[] = [];
  queryForm: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.queryForm = this.fb.group({ nationalId: [''] });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.customerService.list().subscribe({
      next: (res) => { this.customers = ((res as any)?.data ?? res) || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  search(): void {
    const nationalId = this.queryForm.value.nationalId;
    if (!nationalId) { this.loadAll(); return; }
    this.loading = true;
    this.customerService.getByNationalId(nationalId).subscribe({
      next: (res) => { const data = (res as any)?.data ?? res; this.customers = data ? [data] : []; this.loading = false; },
      error: () => { this.loading = false; this.customers = []; }
    });
  }

}





