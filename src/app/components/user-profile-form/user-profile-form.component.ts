import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css']
})
export class UserProfileFormComponent implements OnInit {

  retiros;
  currentRetiro = "";
  isDelivery = false;
  isLinkOrImport:string;
  payments;
  currentPayment = ""
  isTDC = false;

  address = {
    name: "",
    address: ""
  }

  data={
    nombre:'',
    apellido:'',
    photo:'',
    role:''
  }
  payment = {}

  id;

  user;

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService
   ) { 
     this.id = this.route.snapshot.paramMap.get('id');
      // console.log(this.route.snapshot.paramMap.get('name'));
      this.auth.user$.subscribe(async user => {
        if(user) {
          this.user = user;
          
          // console.log(this.user.image);

          // this.data.name=this.user.displayName;
          // this.data.lastName=this.user.displayName;
          // this.data.image=this.user.photoURL;
          // console.log(this.data);

          // console.log(this.userService.get_data(this.user));
          this.data = await this.userService.get_data(this.user);
          console.log(this.data);
        }
      })

    // console.log(this.data);

      
   }
  imagenGmail(){
    this.data.photo=this.user.photoURL;
  }

  LinkOrImportChangeHandler(event) {
    // console.log(event.target.value);
    this.isLinkOrImport = event.target.value;

    // if (event.target.value == 'Link') {
    //   this.isLinkOrImport = true;
    // }else{
    //   this.isLinkOrImport = false;
    // }

  }
  
  
  save(form) {
    for(let field in form){
      if(!form[field] && field!='photo'){
        return alert("Error: Revise que haya llenado todos los campos obligatorios");
      }else{
        this.userService.update_data(this.user,this.data.nombre,this.data.apellido,this.data.photo);
      }
    }
    // this.userService.update_data(this.user, this.data.nombre, this.data.apellido, this.data.photo);

  }

  
  ngOnInit(): void {
    
  }

}
