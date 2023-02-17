import {  Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable, OnDestroy } from '@angular/core';
import { child, DataSnapshot, get, getDatabase } from '@firebase/database';
import { ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {

  sub: Subscription;
  items: {};
  subb: Subscription;
  quantity :number;
  

  constructor(private db: AngularFireDatabase) { }

  private create()
  {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }



 private async getOrCreateCartId()
  {
    let cartId = localStorage.getItem("cartId");

    if(!cartId) 
    {
      let result = await this.create();
      localStorage.setItem("cartId",result.key);
      this.items = [];
      return result.key;
    }


    this.subb = this.db.object("/shopping-carts/"+cartId+"/items").valueChanges().subscribe((res:{}) => this.items = res)
    
    return cartId
    


  }

  async getCart()
  {
    let cartId = await this.getOrCreateCartId()
    return this.db.object("/shopping-carts/"+cartId);
  }

  getItem(cartId:string, productId:string)
  {
    return this.db.object("/shopping-carts/"+cartId+"/items/"+productId)
  }



   getQuantityPromise(cartId:string, productId:string):Promise<DataSnapshot>
  {
    let db = getDatabase()
    return get(child(ref(db),"/shopping-carts/" + cartId + "/items/" + productId + "/quantity"))
    
  }

 async clear()
  {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/"+cartId).remove();
  }

  async addToCart(product)
  {
    let cartId = await this.getOrCreateCartId();
    
    let item = this.getItem(cartId, product.title)
    
      if(item)
      {
        
        let quantity:number;
        this.getQuantityPromise(cartId,product.title).then(s=>{
          quantity = s.val()
          item.set({product:product,quantity:quantity+1})
        })
      }
      else
      {
        item.set({product:product, quantity:1})
      }
    
    
  }

  async removeCart(product)
  {
    let cartId = await this.getOrCreateCartId();
    
    let item = this.getItem(cartId, product.title)
    
      if(item)
      {
        
        let quantity:number;
        this.getQuantityPromise(cartId,product.title).then(s=>{
          quantity = s.val()
          if(quantity <=1) item.remove()
          else item.set({product:product,quantity:quantity-1})

        })
      }
      else
      {
        item.set({product:product, quantity:1})
      }
    
    
  }

  ngOnDestroy(): void {
      if(this.sub)
        this.sub.unsubscribe()
      if(this.subb)
        this.subb.unsubscribe()
  }
}
