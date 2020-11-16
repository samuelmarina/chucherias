import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getRole(userId) {
    return this.db.object("/users/" + userId + "/role");
  }

  createRole(userId){
    return this.db.object("/users/" + userId ).update({role: "user"})
  }
}
