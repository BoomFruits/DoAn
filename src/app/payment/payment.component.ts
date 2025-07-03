import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';
import { BookingService } from '../services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../services/payment.service';
import { VnPayCreatePaymentRequest } from '../../model/VnPayCreatePaymentRequest.model';
import { PaypalCreatePaymentRequest } from '../../model/PaypalCreatePaymentRequest.model';
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
    private paymentService: PaymentService,
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
          console.log('booking data api: ', data);
          this.booking = data;
          this.totalPrice = data.totalPrice;
        });
      }
    });
  }
  submitPayment() {
    if (!this.booking?.bookingId) {
      this.toastr.error('Mã đơn không tìm thấy');
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
        this.toastr.error('Phương thức thanh toán không hợp lệ');
    }
  }

  payWithVnPay() {
    const payload: VnPayCreatePaymentRequest = {
      totalPrice: this.totalPrice,
      BookingId: this.booking.bookingId,
      CreatedDate: new Date().toISOString(),
    };
    this.paymentService.createVNPayPayment(payload)
      .subscribe({
        next: (res) => {
              window.location.href = res.paymentUrl;
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Thanh toán VNPay lỗi');
        },
      });
  }
  payWithPaypal() {
    const payload: PaypalCreatePaymentRequest = {
      baseUrl: 'https://localhost:4200',
      bookingId: this.booking.bookingId,
      tax: 0,
      shipping: 0,
      items: [
        {
          name: 'Hotel Booking',
          currency: 'USD',
          price: (this.totalPrice / 24000).toFixed(2), // Chuyển từ VND sang USD
          quantity: '1',
          sku: 'booking',
        },
      ],
    };
    this.paymentService.createPaypalPayment(payload)
      .subscribe({
        next: (res) => {
          const approvalUrl = res.links.find(
            (l: any) => l.rel === 'approval_url'
          )?.href;
          if (approvalUrl) {
            window.location.href = approvalUrl; // Redirect đến PayPal
          } else {
            this.toastr.error('Không tìm thấy đường dẫn thanh toán PayPal');
          }
        },
        error: () => {
            this.toastr.error('Thanh toán PayPal thất bại');
        },
      });
  }
  payWithCash() {
    this.toastr.success(
      'Đặt phòng thành công! Vui lòng thanh toán khi nhận phòng hoặc sau đó trong lịch sử đặt phòng.'
    );
  }
}
