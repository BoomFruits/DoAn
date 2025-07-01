import { BookingDetail } from "./BookingDetail.model";
import { Room } from "./room.model";

export interface Booking {
   id: number;
  userEmail: string;
  userName: string;
  totalPrice: number;
  status: number;
  isPaid: boolean;
  paymentMethod: string;
  note: string;
  paymentDate: string;
  bookingDate: string;
  checkinDate: string;
  checkoutDate: string;
  rooms: BookingDetail[];
}
