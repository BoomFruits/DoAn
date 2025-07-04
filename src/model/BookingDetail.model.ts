import { ServiceDetailItem } from "./ServiceDetailItem.model";

export interface BookingDetail {
 roomId: number;
  room_No: string;
  checkinDate: string;
  checkoutDate: string;
  roomNote: string;
  room_Name: string;
  bookingId: number;
  price: number;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  services: ServiceDetailItem[];
}