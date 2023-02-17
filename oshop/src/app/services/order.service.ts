import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,private shoppingCartService: ShoppingCartService) { }

  async storeOrder(order)
  {
    let result =await this.db.list("/orders").push(order);
    this.shoppingCartService.clear()

    return result

  }

  getOrdersByUser(userId:string)
  {
    return this.db.list("/orders",ref=>ref.orderByChild("userId").equalTo(userId)).valueChanges()
  }

  getOrderById(orderId:string)
  {
    return this.db.object("/orders/"+orderId).valueChanges()
  }
}
