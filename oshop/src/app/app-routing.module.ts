import { AdminAuthGuardService } from './services/guards/admin-auth-guard.service';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "products",component:ProductsComponent},
  {path: "shopping-cart",component:ShoppingCartComponent},
  {path:"login",component:LoginComponent},

  {path:"check-out",component:CheckOutComponent,canActivate:[AuthGuardService]},
  {path:"order/success/:id",component:OrderSuccessComponent,canActivate:[AuthGuardService]},
  {path:"admin/products/new",component:ProductFormComponent,canActivate:[AuthGuardService,AdminAuthGuardService]},
  {path:"admin/products/:id",component:ProductFormComponent,canActivate:[AuthGuardService,AdminAuthGuardService]},
  {path: "admin/products",component:AdminProductsComponent,canActivate:[AuthGuardService,AdminAuthGuardService]},
  {path:"my/orders",component:MyOrdersComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
