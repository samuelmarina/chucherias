import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { RetiroService } from 'src/app/services/retiro/retiro.service';
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  retiros;
  currentRetiro = "";
  isDelivery = false;
  address = {
    name: "",
    address: ""
  }

  constructor(
    private formBuilder:FormBuilder,
    private retiroService: RetiroService
    ) { 
      this.buildForm();
      
      this.retiroService.getAll().valueChanges().subscribe(retiros => {
        this.retiros = retiros;
      })
    }

  form:FormGroup;
  
  ngOnInit(): void {
  }

  retiroChangeHandler(event){
    this.currentRetiro = event.target.value;
    this.currentRetiro === 'Delivery' ? this.isDelivery = true : this.isDelivery = false;
  }

  private buildForm() {
    // this.form = new FormGroup({
    //   metodoEnvio: new FormControl('', [Validators.required]),
    //   name: new FormControl('', [Validators.required]),
    //   date: new FormControl('', [Validators.required]),
    //   direccion: new FormControl('', [Validators.email]),
    //   pais: new FormControl('', [Validators.maxLength(200)]),
    //   estado: new FormControl('', [Validators.required]),
    //   ciudad: new FormControl('', [Validators.required]),
    //   codigoPostal: new FormControl('', [Validators.required]),
    //   metodoPago: new FormControl('', [Validators.required]),
    //   numeroTarjeta: new FormControl('', [Validators.required]),
    //   nombreTarjeta: new FormControl('', [Validators.required]),
    //   fechaExpiracion: new FormControl('', [Validators.required]),
    // });

    this.form = this.formBuilder.group({
      metodoEnvio: ['', [Validators.required]],
      name: ['', [Validators.required]],
      
      direccion: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]],
      metodoPago: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required]],
      nombreTarjeta: ['', [Validators.required]],
      fechaExpiracion: ['', [Validators.required]]
    });


    // this.form = this.formBuilder.group({
    //   name: ['', [Validators.required]],
    //   date: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   text: ['', [Validators.required, Validators.maxLength(200)]],
    //   category: ['', [Validators.required]],
    //   gender: ['', [Validators.required]],
    // });

    // this.form.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
  }

  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    console.log(value);
  }
}
