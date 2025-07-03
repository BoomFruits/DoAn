export interface VnPayResponse {
  success: boolean;
  paymentMethod: string;
  orderId: number;
  paymentId: string;
  transactionId: string;
  token: string;
  vnPayResponseCode: string;
  orderDescription: string;
  paymentUrl: string;
}