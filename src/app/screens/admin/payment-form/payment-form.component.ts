import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  payment = {
    key: null,
    name: ""
  };
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.paymentService.getPayment(this.id).snapshotChanges().pipe(take(1))
      .subscribe(payment => {
        this.payment = {
          key: payment.key,
          ...payment.payload.val() as any
        }
      })
    }
  }

  save(form) {
    if(form.name === "") return alert("Error: tiene que introducir un nombre al método de pago");
    if(this.id){
      this.paymentService.update(this.id, form);
    }
    else{
      this.paymentService.create(form.name);
    }
    this.router.navigate(['admin/payments']);
  }

  delete(){
    if(confirm("Está seguro que desea eliminar el método de pago?")){
      this.paymentService.delete(this.id);
      this.router.navigate(['admin/payments']);
    }
  }

}
