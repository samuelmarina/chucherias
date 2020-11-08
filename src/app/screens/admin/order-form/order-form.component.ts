import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  statuses$;

  constructor(private statusService: StatusService) { 
    this.statuses$ = statusService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val() as any})))
    )
  }

  ngOnInit(): void {
  }

  save(form) {

  }

}
