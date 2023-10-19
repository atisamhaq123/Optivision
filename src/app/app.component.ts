import { Component,Renderer2,ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OptiVision';

  constructor(private renderer: Renderer2, private el: ElementRef){

  }
  off(){
    const elementToClick = this.el.nativeElement.querySelector('.onoff');
    if (elementToClick){

      this.renderer.removeClass(elementToClick, 'show');
    }
  }

}
