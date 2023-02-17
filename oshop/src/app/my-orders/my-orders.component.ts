import { OrderService } from './../services/order.service';
import { AuthService } from './../services/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnDestroy {

  orders;
  userSub:Subscription
  orderSub: Subscription

  constructor(private auth: AuthService, private orderService: OrderService)
  {
    this.userSub = this.auth.user.subscribe(x =>{
      this.orderSub = this.orderService.getOrdersByUser(x.uid).subscribe(u => {
        this.orders = u
      })
    })
  }

    ngOnDestroy(): void {
        this.userSub.unsubscribe()
        this.orderSub.unsubscribe()
    }


}
