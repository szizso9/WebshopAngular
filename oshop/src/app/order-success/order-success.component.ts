import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnDestroy {

  id: string;
  sub: Subscription

  constructor(private route: ActivatedRoute) {
     this.sub = this.route.paramMap.subscribe(x=> this.id = x.get("id"));
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }
}
