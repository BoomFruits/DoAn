import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-payment-success',
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit{
   constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  booking: any
  message = ""
  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const bookingId = params['bookingId'];
    const method = params['method']; // 'VNPay' | 'PayPal'
    
    if (!bookingId) {
      this.router.navigate(['/']); // fallback nếu thiếu param
    }

    // Gọi API lấy chi tiết booking
    this.http.get<any>(`https://localhost:7275/api/booking/${bookingId}`).subscribe({
      next: (res) => {
        console.log(res)
        this.booking = res;
      },
      error: () => {
        this.message = "Not found booking info.";
      }
    });
  });
}

}
