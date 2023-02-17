import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private admins =["Zsolt Szigetközi","Boglárka Bognár", "Judit Rences", "Rences Judit", "Pinczés Péter","Péter Pinczés"];

  constructor(private db : AngularFireDatabase) 
  { 

  }

  save(user: User)
  {
    let admin =false;

    if(this.admins.includes(user.displayName)) admin =true;

    this.db.object("/users/"+user.uid).update({
      name: user.displayName,
      isAdmin: admin,
      email: user.email
    });
  }

  public get(uid:string):Observable<any>
  {
    return this.db.object("/users/"+uid).valueChanges();
  }
}
