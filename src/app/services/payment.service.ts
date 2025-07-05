import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { VnPayCreatePaymentRequest } from "../../model/VnPayCreatePaymentRequest.model";
import { VnPayResponse } from "../../model/VnPayResponse.model";
import { PaypalCreatePaymentRequest } from "../../model/PaypalCreatePaymentRequest.model";
import { PaypalCreatePaymentResponse } from "../../model/PaypalCreatePaymentResponse.model";

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  createVNPayPayment(payload: VnPayCreatePaymentRequest) {
    return this.http.post<VnPayResponse>(`${environment.apiUrl}/payment/vnpay/create-payment`, payload);
  }

  createPaypalPayment(payload: PaypalCreatePaymentRequest) {
    return this.http.post<PaypalCreatePaymentResponse>(`${environment.apiUrl}/payment/paypal/create-payment`, payload);
  }
}
