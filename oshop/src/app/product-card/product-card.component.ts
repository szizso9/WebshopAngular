import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input("product") product;
  @Input("show-actions") showActions=true;
  @Input("shopping-cart") shoppingCart;
  @Input("only-actions") onlyActions=false;



  constructor(private shoppingCartService: ShoppingCartService)
  {

     
  }

  addToCart(product)
  {
    this.shoppingCartService.addToCart(product)
  }

  removeCart(product)
  {
    this.shoppingCartService.removeCart(product)
  }

    getQuantity(product)
    {
      
      if(this.shoppingCartService.items && this.shoppingCartService.items[product.title])
      {
        return this.shoppingCartService.items[product.title]["quantity"]

      }
      return 0
    
    }



}
