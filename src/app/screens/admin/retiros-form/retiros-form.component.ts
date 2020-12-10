import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { RetiroService } from 'src/app/services/retiro/retiro.service';

@Component({
  selector: 'app-retiros-form',
  templateUrl: './retiros-form.component.html',
  styleUrls: ['./retiros-form.component.css']
})
export class RetirosFormComponent implements OnInit {
  retiro = {
    key: null,
    name: ""
  };
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private retiroService: RetiroService
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.retiroService.getRetiro(this.id).snapshotChanges().pipe(take(1))
      .subscribe(retiro => {
        this.retiro = {
          key: retiro.key,
          ...retiro.payload.val() as any
        }
      })
    }
  }

  ngOnInit(): void {
  }

  save(form){
    if(form.name === "") return alert("Error: tiene que introducir un nombre al método de retiro");
    if(this.id){
      this.retiroService.update(this.id, form);
    }
    else{
      this.retiroService.create(form.name);
    }
    this.router.navigate(['admin/retiros']);
  }

  delete(){
    if(confirm("Está seguro que desea eliminar el método de retiro?")) {
      this.retiroService.delete(this.id);
      this.router.navigate(['admin/retiros']);
    }
  }

}
