import { ProductService } from './../services/product.service';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  category: string;
  products=[];
  filteredProducts=[];
  sub: Subscription;
  cart;

  

  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService)
  {
    this.sub=this.productService
    .getAll()
    .snapshotChanges()
    .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, value: c.payload.val() }))))
    .subscribe((data) => {
      this.products = data;

      route.queryParamMap.subscribe(params=>{
        this.category = params.get("category");
        this.filteredProducts = (this.category) ? this.products.filter(p => p.value.category === this.category) : this.products;
      });
    });

  }
  
  async ngOnInit() {
       this.sub =(await this.shoppingCartService.getCart()).snapshotChanges().subscribe(res => this.cart=res.key)
  }

  ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe()
  }



}
