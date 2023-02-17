import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product)
  {
    return this.db.list("/products").push(product);
  }

  getAll(): AngularFireList<any>
  {
    return this.db.list("products");
  }

  delete(productId)
  {
    return this.db.object("/products/"+productId).remove();
  }

  update(productId,product)
  {
    return this.db.object("/products/"+productId).update(product);
  }

  get(productId)
  {
    return this.db.object("/products/"+productId);
  }
}
