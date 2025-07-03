export interface PaypalCreatePaymentResponse {
  id: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}