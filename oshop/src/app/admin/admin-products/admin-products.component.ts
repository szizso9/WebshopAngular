import { ProductService } from './../../services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent  implements OnDestroy{

  products: any[];
  filteredProducts: any[];
  sub: Subscription;

  constructor(private productService: ProductService)
  {
    this.sub=this.productService
    .getAll()
    .snapshotChanges()
    .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, value: c.payload.val() }))))
    .subscribe((data) => {
      this.filteredProducts=this.products = data;
    });

  }

  filter(query:string)
  {
    this.filteredProducts = (query) ? this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy(): void {
      if(this.sub)
        this.sub.unsubscribe();
  }
}
