import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { AppUser } from './../model/app-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy{

  appUser:AppUser;
  cartQuantity:number;
  sub: Subscription;

  constructor(public auth:AuthService, private shoppingCartService: ShoppingCartService) {
    
  }

  logout():void
  {
    this.auth.logout();
  }
  
  login()
  {
    this.auth.login()
  }

 async ngOnInit(){
    this.auth.getAppUser().subscribe(appUser => this.appUser=appUser)

     ;(await this.shoppingCartService.getCart()).valueChanges().subscribe(res => {
      this.cartQuantity=0
      if(res)
      {
        for(let productId in res["items"])
        {
          this.cartQuantity += res["items"][productId]["quantity"]
        }
      }

     })
  }

  ngOnDestroy(): void {
     
  }






  


}
