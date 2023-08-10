import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isDarkMode = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  get theme() {
    return this.isDarkMode ? 'dark-theme' : 'light-theme';
  }
  changeMode() {
    this.isDarkMode = !this.isDarkMode;
    this.renderer.setAttribute(
      this.element.nativeElement.ownerDocument.documentElement,
      'theme',
      this.theme
    );
  }
}
