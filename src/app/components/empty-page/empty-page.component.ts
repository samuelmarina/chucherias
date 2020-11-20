import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.css']
})
export class EmptyPageComponent implements OnInit {
  urlActual;
  booleano:boolean = false;
  page: string;

  constructor() { 
  }
  ngOnInit(): void {
    this.urlActual = window.location;
    if (this.urlActual.pathname == '/bolsa') {
      this.page = "bag";
    } else if (this.urlActual.pathname == '/carrito'){
        this.page = "cart";
    } else if (this.urlActual.pathname == '/wishlist'){
        this.page = "wish"
    } 
  
  }
  
}
