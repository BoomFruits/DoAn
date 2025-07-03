import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-failed',
  encapsulation:ViewEncapsulation.None,
  standalone:true,
  imports: [RouterModule,CommonModule],
  templateUrl: './payment-failed.component.html',
  styleUrl: './payment-failed.component.scss'
})
export class PaymentFailedComponent {
 bookingId: string | null = null;
  method: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.bookingId = this.route.snapshot.queryParamMap.get('bookingId');
    this.method = this.route.snapshot.queryParamMap.get('method');
  }
}
