import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from 'url';
import { threadId } from 'worker_threads';

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
    console.log(this.urlActual.pathname);
    if (this.urlActual.pathname == '/bolsa') {
      this.page = "bag";
    } else if (this.urlActual.pathname == '/carrito'){
        this.page = "cart";
    } else if (this.urlActual.pathname == '/wishlist'){
        this.page = "wish"
    } 
  
  }
  
}
