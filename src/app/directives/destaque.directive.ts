import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDestaque]',
  standalone: true,
})
export class DestaqueDirective implements OnInit {
  @Input() appDestaque: string = '#e8f0fe';
  @Input() corOriginal: string = 'transparent';

  @HostBinding('style.backgroundColor') bgColor: string = 'transparent';
  @HostBinding('style.transition') transition: string = 'background-color 0.2s ease';
  @HostBinding('style.cursor') cursor: string = 'pointer';

  ngOnInit() {
    this.bgColor = this.corOriginal;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.bgColor = this.appDestaque;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.bgColor = this.corOriginal;
  }
}
