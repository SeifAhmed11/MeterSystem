import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RechargeService, RechargeDto } from '../../services/recharge.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-recharges',
  template: `
    <div class="recharges-container">
      <div class="page-header">
        <div class="brand">
          <i class="fas fa-credit-card"></i>
          <div>
            <h1>إدارة إعادة الشحن</h1>
            <p>تنفيذ عمليات الشحن وعرض السجل</p>
          </div>
        </div>
        <button class="btn-primary-min" (click)="loadAll()" [disabled]="loading">
          تحديث
        </button>
      </div>

      <div class="grid">
        <div class="card-simple">
          <h3 class="card-title">عملية شحن جديدة</h3>
          <form [formGroup]="createForm" (ngSubmit)="createRecharge()" class="form">
            <div class="form-group">
              <label>رقم العداد (MeterId)</label>
              <input class="form-input" formControlName="meterId" placeholder="UUID" />
              <div class="form-error" *ngIf="createForm.get('meterId')?.invalid && (createForm.get('meterId')?.touched || createForm.get('meterId')?.dirty)">الرقم مطلوب</div>
            </div>
            <div class="form-group">
              <label>المبلغ</label>
              <input class="form-input" type="number" formControlName="amount" placeholder="0" />
              <div class="form-error" *ngIf="createForm.get('amount')?.invalid && (createForm.get('amount')?.touched || createForm.get('amount')?.dirty)">المبلغ يجب أن يكون أكبر من 0</div>
            </div>
            <button class="btn-primary-min w-100" type="submit" [disabled]="createForm.invalid || loading">شحن</button>
          </form>
        </div>

        <div class="card-simple">
          <h3 class="card-title">استعلام سريع</h3>
          <form [formGroup]="queryForm" class="form small-gap">
            <div class="form-row">
              <div class="form-group">
                <label>Serial</label>
                <input class="form-input" formControlName="serial" placeholder="1" />
              </div>
              <div class="form-group">
                <label>من</label>
                <input class="form-input" type="date" formControlName="from" />
              </div>
              <div class="form-group">
                <label>إلى</label>
                <input class="form-input" type="date" formControlName="to" />
              </div>
            </div>
            <div class="actions">
              <button class="btn-outline-min" type="button" (click)="getBySerial()" [disabled]="!queryForm.value.serial || loading">حسب Serial</button>
              <button class="btn-outline-min" type="button" (click)="getLast()" [disabled]="!queryForm.value.serial || loading">آخر شحن</button>
              <button class="btn-outline-min" type="button" (click)="filterDate()" [disabled]="!queryForm.value.serial || !queryForm.value.from || !queryForm.value.to || loading">فلترة بالتاريخ</button>
            </div>
          </form>
          <div class="last-box" *ngIf="lastCharge">
            <div>آخر شحن للـ Serial {{queryForm.value.serial}}:</div>
            <div class="last-line">المبلغ: <b>{{lastCharge.amount}}</b> - التاريخ: <b>{{lastCharge.createdAt | date:'medium'}}</b></div>
          </div>
        </div>
      </div>

      <div class="card-simple">
        <h3 class="card-title">سجل عمليات الشحن</h3>
        <div class="table-container simple">
          <table>
            <thead>
              <tr>
                <th>Serial/Meter</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of recharges">
                <td>{{r.meterId}}</td>
                <td>{{r.amount}}</td>
                <td>{{r.createdAt | date:'short'}}</td>
              </tr>
              <tr *ngIf="!loading && recharges.length === 0">
                <td colspan="3" class="empty">لا توجد بيانات</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recharges-container {
      padding: 16px;
    }
    
    .page-header {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 12px 16px;
      box-shadow: var(--shadow-sm);
    }

    .brand { display: flex; gap: 10px; align-items: center; }
    .brand i { color: var(--primary-color); font-size: 20px; }
    .brand h1 { margin: 0; font-size: 18px; color: #000; }
    .brand p { margin: 2px 0 0; color: var(--text-secondary); font-size: 0.9rem; }
    
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 12px; }
    .card-simple { background: #fff; border: 1px solid var(--border-color); border-radius: 12px; padding: 12px; box-shadow: var(--shadow-sm); }
    .card-title { margin: 0 0 10px; color: #000; font-size: 16px; }
    
    .form { display: flex; flex-direction: column; gap: 10px; }
    .form.small-gap { gap: 8px; }
    .form-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .form-group label { display: block; margin-bottom: 4px; font-weight: 600; color: #000; font-size: 0.9rem; }
    .form-input { width: 100%; padding: 8px 10px; border: 1.5px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; background: #fff; }
    .form-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(227,30,38,0.08); }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
    .w-100 { width: 100%; }

    .table-container.simple { border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; background: #fff; }
    table { width: 100%; border-collapse: collapse; }
    thead th { text-align: right; background: #f4f5f7; border-bottom: 1px solid var(--border-color); padding: 10px; font-weight: 700; font-size: 0.9rem; color: #000; }
    tbody td { padding: 10px; border-bottom: 1px solid var(--border-color); font-size: 0.95rem; color: #000; background: #fff; }
    tbody tr:nth-child(even) td { background: #fbfbfc; }
    tbody tr:hover td { background: #f1f5f9; }
    .empty { text-align: center; color: var(--text-secondary); background: #fff; }

    .btn-primary-min { height: 36px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--primary-color); color: #fff; font-weight: 600; cursor: pointer; transition: var(--transition); padding: 0 12px; }
    .btn-primary-min:hover { background: var(--primary-dark); }
    .btn-outline-min { height: 36px; border-radius: 8px; border: 1px solid var(--border-color); background: #fff; color: var(--text-primary); font-weight: 600; cursor: pointer; transition: var(--transition); padding: 0 12px; }
    .btn-outline-min:hover { border-color: var(--primary-color); color: var(--primary-color); }

    .last-box { margin-top: 8px; background: #fff; border: 1px solid var(--border-color); border-radius: 8px; padding: 8px 10px; }
    .last-line { color: #000; font-size: 0.95rem; }
  `]
})
export class RechargesComponent implements OnInit {
  loading = false;
  recharges: RechargeDto[] = [];
  lastCharge: RechargeDto | null = null;
  createForm: FormGroup;
  queryForm: FormGroup;

  constructor(private fb: FormBuilder, private rechargeService: RechargeService, private toast: ToastService) {
    this.createForm = this.fb.group({
      meterId: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(1)]]
    });

    this.queryForm = this.fb.group({
      serial: [''],
      from: [''],
      to: ['']
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.rechargeService.listAll().subscribe({
      next: (res) => {
        // some backends wrap in data; our BaseResponse<RechargeDto[]> assumed
        const data: any = (res as any)?.data ?? (res as any);
        this.recharges = data || [];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  createRecharge(): void {
    if (this.createForm.invalid) {
      this.toast.showError('يرجى إدخال MeterId صحيح ومبلغ أكبر من 0');
      this.createForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.rechargeService.createRecharge(this.createForm.value).subscribe({
      next: () => {
        this.createForm.reset({ meterId: '', amount: 0 });
        this.loadAll();
      },
      error: (err) => {
        this.loading = false;
        this.toast.showError(this.pickError(err, 'فشل إنشاء عملية الشحن'));
      }
    });
  }

  getBySerial(): void {
    const serial = this.queryForm.value.serial;
    if (!serial) {
      this.toast.showError('من فضلك أدخل Serial صحيح');
      return;
    }
    this.loading = true;
    this.rechargeService.getRechargeBySerial(serial).subscribe({
      next: (res) => {
        const data: any = (res as any)?.data ?? (res as any);
        this.recharges = data ? [data] : [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toast.showError(this.pickError(err, 'تعذر جلب بيانات الـ Serial'));
      }
    });
  }

  getLast(): void {
    const serial = this.queryForm.value.serial;
    if (!serial) {
      this.toast.showError('من فضلك أدخل Serial صحيح');
      return;
    }
    this.loading = true;
    this.rechargeService.getLastCharge(serial).subscribe({
      next: (res) => {
        const data: any = (res as any)?.data ?? (res as any);
        this.lastCharge = data ?? null;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toast.showError(this.pickError(err, 'تعذر جلب آخر عملية شحن'));
      }
    });
  }

  filterDate(): void {
    const { serial, from, to } = this.queryForm.value;
    if (!serial || !from || !to) {
      this.toast.showError('أكمل الحقول: Serial و من وإلى');
      return;
    }
    this.loading = true;
    this.rechargeService.filterByDate(serial, from, to).subscribe({
      next: (res) => {
        const data: any = (res as any)?.data ?? (res as any);
        this.recharges = data || [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toast.showError(this.pickError(err, 'تعذر الفلترة بالتاريخ'));
      }
    });
  }

  private pickError(err: any, fallback: string): string {
    const msg = err?.error?.message || err?.message || err?.statusText;
    return msg ? String(msg) : fallback;
  }

}





