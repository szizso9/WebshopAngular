import { ShoppingCartService } from './../services/shopping-cart.service';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  cart;
  sub:Subscription;
  
  constructor(public cartService: CartService, private shoppingCartService: ShoppingCartService) {

  }
  
  clearCart()
  {
    this.shoppingCartService.clear()
  }

  async ngOnInit() {
    this.sub =(await this.shoppingCartService.getCart()).snapshotChanges().subscribe(res => this.cart=res.key)
}

  

}
