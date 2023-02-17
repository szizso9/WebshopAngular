import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy, OnInit {

  categories;
  obs: Observable<any>
  sub: Subscription;
  product={title:"",price:0,imageUrl:"",category:""};
  id;

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute){
    
  }
  ngOnInit(): void {
    this.categories = this.categoryService.getCategories().valueChanges();


    this.id=this.route.snapshot.paramMap.get("id");
 
    if(this.id)
    {
     this.obs=this.productService.get(this.id).valueChanges();
     this.sub=this.obs.subscribe(x=>this.product=x)
    } 
  }

  save(product)
  {
    if(this.id)
    {
      this.productService.update(this.id,product)
    }
    else{
      this.productService.create(product);
    }

    this.router.navigate(["/admin/products"]);
  }

  delete()
  {
    if(confirm("Biztosan ki akarod törölni ezt a terméket?"))
    {
      this.productService.delete(this.id);
      this.router.navigate(["/admin/products"]);
    }
  }

  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe();
  }


}
