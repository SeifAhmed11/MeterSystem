import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractService, ContractDto } from '../../services/contract.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contracts',
  template: `
    <div class="contracts-container">
      <div class="page-header">
        <div class="brand">
          <i class="fas fa-file-contract"></i>
          <div>
            <h1>إدارة العقود</h1>
            <p>إنشاء وعرض وتصفية العقود</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-refresh" (click)="loadAll()" [disabled]="loading">
            <i class="fas fa-sync-alt" [class.fa-spin]="loading"></i>
            تحديث
          </button>
          <button class="btn-all-h" (click)="loadAllAll()" [disabled]="loading">
            <i class="fas fa-list"></i>
            جميع العقود
          </button>
        </div>
      </div>

      <div class="grid">
        <div class="card-simple">
          <h3 class="card-title">إنشاء عقد جديد</h3>
          <form [formGroup]="createForm" (ngSubmit)="create()" class="form">
            <div class="form-group">
              <label>عنوان التركيب</label>
              <input class="form-input" formControlName="installationAddress" />
            </div>
            <div class="form-group">
              <label>تاريخ التفعيل</label>
              <input class="form-input" type="datetime-local" formControlName="activationDate" />
            </div>
            <div class="form-group">
              <label>رسوم ثابتة</label>
              <input class="form-input" type="number" formControlName="fixedFees" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Meter Serial</label>
                <input class="form-input" formControlName="meterSerial" />
              </div>
              <div class="form-group">
                <label>Meter Type</label>
                <input class="form-input" formControlName="meterType" />
              </div>
              <div class="form-group">
                <label>Meter Installed Date</label>
                <input class="form-input" type="datetime-local" formControlName="meterInstalledDate" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>National ID</label>
                <input class="form-input" formControlName="nationalId" />
              </div>
              <div class="form-group">
                <label>الاسم</label>
                <input class="form-input" formControlName="name" />
              </div>
              <div class="form-group">
                <label>العنوان</label>
                <input class="form-input" formControlName="address" />
              </div>
            </div>
            <button class="btn-primary-min" type="submit" [disabled]="createForm.invalid || loading">إنشاء</button>
          </form>
        </div>

        <div class="card-simple">
          <h3 class="card-title">تصفية</h3>
          <form [formGroup]="filterForm" class="form small-gap">
            <div class="form-row">
              <div class="form-group">
                <label>من</label>
                <input class="form-input" type="date" formControlName="from" />
              </div>
              <div class="form-group">
                <label>إلى</label>
                <input class="form-input" type="date" formControlName="to" />
              </div>
              <div class="form-group">
                <label>كود العميل</label>
                <input class="form-input" formControlName="customerCode" />
              </div>
              <div class="form-group">
                <label>Serial العداد</label>
                <input class="form-input" formControlName="meterSerial" />
              </div>
            </div>
            <div class="actions">
              <button type="button" class="btn-all" (click)="applyFilter()" [disabled]="loading">تطبيق</button>
              <button type="button" class="btn-all" (click)="loadDeleted()" [disabled]="loading">المحذوف</button>
            </div>
          </form>
        </div>
      </div>

      <div class="card-simple">
        <h3 class="card-title">قائمة العقود</h3>
        <div class="table-container simple scrollable">
          <table>
            <thead>
              <tr>
                <th>كود العميل</th>
                <th>Serial</th>
                <th>الاسم</th>
                <th>العنوان</th>
                <th>تفعيل</th>
                <th>الرسوم</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of contracts">
                <td>{{c.customerCode}}</td>
                <td>{{c.meter?.serial || '—'}}</td>
                <td>{{c.customer?.name || '—'}}</td>
                <td>{{c.installationAddress || '—'}}</td>
                <td>{{c.activationDate | date:'short'}}</td>
                <td>{{c.fixedFees}}</td>
              </tr>
              <tr *ngIf="!loading && contracts.length === 0">
                <td colspan="6" class="empty">لا توجد بيانات</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contracts-container { padding: 16px; }
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

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
    .card-simple { background: #fff; border: 1px solid var(--border-color); border-radius: 12px; padding: 12px; box-shadow: var(--shadow-sm); }
    .card-title { margin: 0 0 10px; color: #000; font-size: 16px; }
    .form { display: flex; flex-direction: column; gap: 10px; }
    .form.small-gap { gap: 8px; }
    .form-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .form-group label { display: block; margin-bottom: 4px; font-weight: 600; color: #000; font-size: 0.9rem; }
    .form-input { width: 100%; padding: 8px 10px; border: 1.5px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; background: #fff; }
    .form-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(227,30,38,0.08); }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn-primary-min { height: 36px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--primary-color); color: #fff; font-weight: 600; cursor: pointer; transition: var(--transition); padding: 0 12px; }
    .btn-primary-min:hover { background: var(--primary-dark); }
    .btn-all { height: 36px; border-radius: 8px; border: 1px solid var(--border-color); background: #fff; color: var(--text-primary); font-weight: 600; cursor: pointer; transition: var(--transition); padding: 0 12px; }
    .btn-all:hover { border-color: var(--primary-color); color: var(--primary-color); }

    .table-container.simple { border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; background: #fff; }
    .table-container.scrollable { max-height: 60vh; overflow: auto; }
    table { width: 100%; border-collapse: collapse; }
    thead th { text-align: right; background: #f4f5f7; border-bottom: 1px solid var(--border-color); padding: 10px; font-weight: 700; font-size: 0.9rem; color: #000; white-space: nowrap; position: sticky; top: 0; z-index: 1; }
    tbody td { padding: 10px; border-bottom: 1px solid var(--border-color); font-size: 0.95rem; color: #000; background: #fff; min-width: 140px; }
    tbody tr:nth-child(even) td { background: #fbfbfc; }
    tbody tr:hover td { background: #f1f5f9; }
    .empty { text-align: center; color: var(--text-secondary); background: #fff; }
  `]
})
export class ContractsComponent implements OnInit {
  loading = false;
  contracts: ContractDto[] = [];
  createForm: FormGroup;
  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private contractService: ContractService, private toast: ToastService) {
    this.createForm = this.fb.group({
      installationAddress: ['', [Validators.required]],
      activationDate: [''],
      fixedFees: [0],
      meterSerial: [''],
      meterType: [''],
      meterInstalledDate: [''],
      nationalId: [''],
      name: [''],
      address: ['']
    });
    this.filterForm = this.fb.group({ from: [''], to: [''], customerCode: [''], meterSerial: [''] });
  }

  ngOnInit(): void { this.loadAllAll(); }

  loadAll(): void {
    this.loading = true;
    this.contractService.filter({}).subscribe({
      next: (res) => { this.contracts = ((res as any)?.data ?? res) || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  loadAllAll(): void {
    this.loading = true;
    this.contractService.listAll().subscribe({
      next: (res) => { this.contracts = ((res as any)?.data ?? res) || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(): void {
    const { from, to, customerCode, meterSerial } = this.filterForm.value;
    this.loading = true;
    this.contractService.filter({ from, to, customerCode, meterSerial }).subscribe({
      next: (res) => { this.contracts = ((res as any)?.data ?? res) || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  loadDeleted(): void {
    this.loading = true;
    this.contractService.listDeleted().subscribe({
      next: (res) => { this.contracts = ((res as any)?.data ?? res) || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  create(): void {
    if (this.createForm.invalid) { this.toast.showError('أكمل البيانات المطلوبة'); return; }
    const body = {
      installationAddress: this.createForm.value.installationAddress,
      activationDate: this.createForm.value.activationDate || new Date().toISOString(),
      fixedFees: Number(this.createForm.value.fixedFees) || 0,
      meterDTO: {
        serial: this.createForm.value.meterSerial,
        type: this.createForm.value.meterType,
        installedDate: this.createForm.value.meterInstalledDate || new Date().toISOString()
      },
      customerDTO: {
        nationalId: this.createForm.value.nationalId,
        name: this.createForm.value.name,
        address: this.createForm.value.address
      }
    };
    this.loading = true;
    this.contractService.createContract(body).subscribe({
      next: () => { this.toast.showSuccess('تم إنشاء العقد بنجاح'); this.createForm.reset({ fixedFees: 0 }); this.loadAll(); },
      error: (err) => { this.toast.showError(err?.error?.message || 'تعذر إنشاء العقد'); this.loading = false; }
    });
  }

}





