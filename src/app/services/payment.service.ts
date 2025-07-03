import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  createVNPayPayment(payload: any) {
    return this.http.post<any>(`${environment.apiUrl}/payment/vnpay/create-payment`, payload);
  }

  createPaypalPayment(payload: any) {
    return this.http.post<any>(`${environment.apiUrl}/payment/paypal/create-payment`, payload);
  }
}
