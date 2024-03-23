import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ScrollToTop]',
})
export class ScrollToTopDirective {
  constructor(private el: ElementRef) {}
  @HostListener('click')
  onClicked() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
 
}
