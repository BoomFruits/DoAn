import { BookingDetailRequest } from "./BookingDetailRequest.model";

export interface BookingRequest {
  customerId: string | null;
  staffId: string | null;
  note: string;
  paymentMethod: string;
  details: BookingDetailRequest[];
}