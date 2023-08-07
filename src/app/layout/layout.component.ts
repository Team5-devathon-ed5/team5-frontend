import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
    `
      app-header {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      }
    `,
  ],
})
export class LayoutComponent {}
