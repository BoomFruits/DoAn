export interface PaypalCreatePaymentRequest {
  baseUrl: string;
  bookingId: number;
  tax: number;
  shipping: number;
  items: Array<{
    name: string;
    currency: string;
    price: string;
    quantity: string;
    sku: string;
  }>;
}