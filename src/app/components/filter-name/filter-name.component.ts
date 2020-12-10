import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-name',
  templateUrl: './filter-name.component.html',
  styleUrls: ['./filter-name.component.css']
})
export class FilterNameComponent implements OnInit {
  productName:string="";
  constructor() { }

  ngOnInit(): void {
  }

}
