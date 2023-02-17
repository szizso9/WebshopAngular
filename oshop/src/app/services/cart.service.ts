import { ShoppingCartService } from './shopping-cart.service';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  cart= [];
  quantity :number;
  sub: Subscription
  totalPrice:number;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.ngOnInit()
  }

  async ngOnInit() {

      this.sub=(await this.shoppingCartService.getCart()).valueChanges().subscribe(res => {
        this.totalPrice=0
        this.cart=[]
        this.quantity=0;
        if(res)
        {
          for(let id in res["items"])
          {
            let price = res["items"][id]["quantity"]*res["items"][id]["product"]["price"]
            this.totalPrice+=price
            res["items"][id]["price"]=price
            this.cart.push(res["items"][id])
            this.quantity += res["items"][id]["quantity"]
          }
        }
      })
      
  }



}
