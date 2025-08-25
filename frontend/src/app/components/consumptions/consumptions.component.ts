import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumptions',
  template: `
    <div class="consumptions-container">
      <div class="page-header">
        <h1>إدارة الاستهلاك</h1>
        <p>إدارة وعرض جميع قراءات الاستهلاك</p>
      </div>
      
      <div class="content-placeholder">
        <div class="placeholder-icon">
          <i class="fas fa-tachometer-alt"></i>
        </div>
        <h2>مكون الاستهلاك</h2>
        <p>سيتم تطوير هذا المكون لاحقاً</p>
      </div>
    </div>
  `,
  styles: [`
    .consumptions-container {
      padding: 2rem;
    }
    
    .page-header {
      margin-bottom: 2rem;
    }
    
    .page-header h1 {
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .page-header p {
      color: var(--text-secondary);
    }
    
    .content-placeholder {
      text-align: center;
      padding: 4rem;
      background: var(--bg-primary);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
    }
    
    .placeholder-icon {
      width: 80px;
      height: 80px;
      background: var(--gradient-warning);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    
    .placeholder-icon i {
      font-size: 2rem;
      color: white;
    }
    
    .content-placeholder h2 {
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    .content-placeholder p {
      color: var(--text-secondary);
    }
  `]
})
export class ConsumptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}





