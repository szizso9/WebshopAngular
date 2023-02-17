import { OrderService } from './../services/order.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  @Input("order") order;


  constructor() {

  }

  ngOnInit(): void {
    
  }




}
