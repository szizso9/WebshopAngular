import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnDestroy {
  shipping = {name: "", address:"", city:""}; 
  userId:string;
  sub: Subscription


  constructor(private authService: AuthService, private cartService: CartService, private orderService: OrderService, private router: Router)
  {
    this.sub=this.authService.user.subscribe(user => this.userId = user.uid)

  }

  async placeOrder() 
  {
    let order = new Order(this.userId, this.shipping, this.cartService)
    let result = await this.orderService.storeOrder(order)
    this.router.navigate(["/order/success",result.key])


  }   

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
}

}
