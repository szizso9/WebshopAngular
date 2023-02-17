import { AppUser } from './../model/app-user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, OnDestroy } from '@angular/core';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable,switchMap,map } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user:Observable<User>;


  constructor(private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute, private userService: UserService) 
  { 
   this.user=afAuth.authState;
   
  }

  login():void{
    let returnUrl=this.route.snapshot.queryParamMap.get("returnUrl") || "/";

    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((user)=>{
 
      this.userService.save(user.user);
      

      this.router.navigateByUrl(returnUrl);
    });
    
  }

  logout():void{
    this.afAuth.signOut();
    this.router.navigate(["/"]);
    
  }

  isAdmin():Observable<boolean>
  {
   return this.getAppUser()
      .pipe(
        map((appUser) => {
          return appUser.isAdmin;
        })
      );
  }

  getAppUser():Observable<AppUser>
  {
    return this.user
      .pipe(switchMap((user) => {
        if(user) return this.userService.get(user.uid);

        return of(null);
      }))
      .pipe(
        map((appUser) => {
          return appUser;
        })
      );
  }

}
