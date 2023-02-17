import { CartService } from '../services/cart.service';
export class Order{

    datePlaced: number;
    items=[];
    price=0;

    

    constructor(public userId:string, public shipping: any, cartService: CartService) 
    {
      this.price=0;
        this.datePlaced = new Date().getTime();
        this.items=cartService.cart.map(i =>{
          this.price+=i.quantity*i.product.price;
            return  {
              product:{
                title:i.product.title,
                imageUrl: i.product.imageUrl,
                category: i.product.category,
                price: i.product.price
              },
              quantity: i.quantity,
              totalPrice: i.price
            }
          })
    }
}