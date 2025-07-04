import { SelectedService } from "./SelectedService.model";

export interface BookingDetailRequest {
  roomId: number | null;
  room_No: string;
  checkinDate: string;
  checkoutDate: string;
  roomNote: string;
  price: number;
  services: SelectedService[];
   room_Name: string;
  bookingId: number;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
}