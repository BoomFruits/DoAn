import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../../model/User.model';
import { BookingService } from '../services/booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  user!: User;
  paymentMethod: string = 'Cash';
  totalPrice!: number;
  booking!: any;
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const userId = this.authService.GetUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
      });
    }
    this.route.paramMap.subscribe((params) => {
      const bookingId = params.get('bookingId');
      if (bookingId) {
        this.bookingService.getBookingDetail(bookingId).subscribe((data) => {
          console.log("booking data api: ",data);
          this.booking = data;
          this.totalPrice = data.totalPrice;
        });
      }
    });
  }
  submitPayment() {
    if (!this.booking?.bookingId) {
                    this.toastr.error('Not found booking')
      return;
    }
    switch (this.paymentMethod) {
      case 'VNPay':
        this.payWithVnPay();
        break;
      case 'PayPal':
        this.payWithPaypal();
        break;
      case 'Cash':
        this.payWithCash();
        break;
      default:
                            this.toastr.error('Payment not valid')
    }
  }

  payWithVnPay() {
    const payload = {
      totalPrice: this.totalPrice,
      BookingId: this.booking.bookingId,
      CreatedDate: new Date(),
    };
    this.http
      .post(
        'https://localhost:7275/api/payment/vnpay/create-payment',
        payload,
        { responseType: 'text' }
      )
      .subscribe({
        next: (paymentUrl) => {
          window.location.href = paymentUrl;
        },
        error: (err) => {
          console.error(err);
                    this.toastr.error('Payment VNPay error')
        },
      });
  }
  payWithPaypal() {
    const payload = {
      baseUrl: 'https://localhost:4200',
      bookingId: this.booking.bookingId,
        tax: 0,
  shipping: 0,
      items: [
        {
          name: 'Hotel Booking',
          currency: 'USD',
          price: (this.totalPrice / 24000).toFixed(2), // Chuyển từ VND sang USD (ví dụ)
          quantity: '1',
          sku: 'booking',
        },
      ],
    };

    this.http
      .post<any>(
        'https://localhost:7275/api/payment/paypal/create-payment',
        payload
      )
      .subscribe({
        next: (res) => {
          const approvalUrl = res.links.find(
            (l: any) => l.rel === 'approval_url'
          )?.href;
          if (approvalUrl) {
            window.location.href = approvalUrl; // Redirect đến PayPal
          } else {
          this.toastr.error('Not found URL payment paypal')
          }
        },
        error: () => {
          this.toastr.error('Payment paypal error')
        },
      });
  }
  payWithCash() {
     this.toastr.success('Booking successfully! Please make payment when checkin or after in history booking')
  }
}
