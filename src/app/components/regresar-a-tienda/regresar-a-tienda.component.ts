import { Component, OnInit } from '@angular/core';
import { Url } from 'url';

@Component({
  selector: 'app-regresar-a-tienda',
  templateUrl: './regresar-a-tienda.component.html',
  styleUrls: ['./regresar-a-tienda.component.css']
})
export class RegresarATiendaComponent implements OnInit {
  urlActual;
  prevUrl;
  booleano:boolean = false;
  page: string;
  constructor() { }

  ngOnInit(): void {
    this.urlActual = window.location;
    if (this.urlActual.pathname == '/bolsa') {
      this.page = "Chucheribolsa";
    } else if (this.urlActual.pathname == '/carrito'){
        this.page = "Chuchericarro";
    } else if (this.urlActual.pathname == '/wishlist'){
        this.page = "Chucherideseos"
    } else if (this.urlActual.pathname == '/producto'){
      this.page = "Chucheriproductos"
    }else if (this.urlActual.pathname == '/check-out'){
      this.page = "Chuchericheckout"
    }else if (this.urlActual.pathname == '/tracking'){
      this.page = "Chucheritracking"
    }else {
      this.page = "Chucheriproductos"
    }

    
  }

}
