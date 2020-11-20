import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.css']
})
export class EmptyPageComponent implements OnInit {


  page: string;


  constructor(private route: ActivatedRoute) { 
    console.log(route)
  }

  ngOnInit(): void {
    this.page = "";
  }
  
}
