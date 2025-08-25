import { Component } from '@angular/core';

@Component({
  selector: 'app-contrast-test',
  template: `
    <div class="contrast-test-container">
      <h1 class="text-contrast">Contrast Test - Dark Text on Light Background</h1>
      
      <div class="test-section">
        <h2 class="text-contrast-white">White Text on Dark Background</h2>
        <p class="text-contrast-white">This text should be clearly visible with white color and dark text shadow.</p>
      </div>
      
      <div class="test-section bg-contrast">
        <h2 class="text-contrast">Dark Text on Light Background</h2>
        <p class="text-contrast">This text should be clearly visible with dark color and light text shadow.</p>
      </div>
      
      <div class="test-section bg-contrast-dark">
        <h2 class="text-contrast-white">White Text on Dark Background</h2>
        <p class="text-contrast-white">This text should be clearly visible with white color and dark text shadow.</p>
      </div>
      
      <div class="test-section">
        <h3>Button Contrast Test</h3>
        <button class="btn btn-primary">Primary Button</button>
        <button class="btn btn-secondary">Secondary Button</button>
        <button class="btn btn-success">Success Button</button>
        <button class="btn btn-warning">Warning Button</button>
        <button class="btn btn-error">Error Button</button>
      </div>
      
      <div class="test-section">
        <h3>Card Contrast Test</h3>
        <div class="card card-gradient">
          <h4>Gradient Card</h4>
          <p>This card has a gradient background with white text.</p>
        </div>
        
        <div class="card card-stats">
          <h4>Stats Card</h4>
          <p>This card has a stats background with white text.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contrast-test-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: var(--bg-primary);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
    }
    
    .test-section {
      margin: 2rem 0;
      padding: 2rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
    }
    
    .test-section h2,
    .test-section h3,
    .test-section h4 {
      margin-bottom: 1rem;
    }
    
    .test-section p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    
    .btn {
      margin: 0.5rem;
    }
    
    .card {
      margin: 1rem 0;
    }
  `]
})
export class ContrastTestComponent {}


