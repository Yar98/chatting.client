import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLeftSide]'
})
export class LeftSideDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
