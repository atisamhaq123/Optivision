import { Component,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{
  loaded=false;
  ngAfterViewInit(): void {
    this.loaded=true;
  }
}
