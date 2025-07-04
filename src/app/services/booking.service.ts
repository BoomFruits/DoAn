// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { Booking } from '../../model/booking.model';
import { environment } from '../../../environment';
import { BookingDetail } from '../../model/BookingDetail.model';
import { Room } from '../../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  cancelBooking(id: number) {
    return this.http.delete(`${environment.apiUrl}`+`/booking/cancel/${id}`, {});
  }
  constructor(private http: HttpClient) {}

  calculateDays(checkin: string | Date, checkout: string | Date): number {
    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.max(1, Math.round((+outDate - +inDate) / msPerDay));
  }

  calculatePrice(days: number, roomPrice: number): number {
    return days * roomPrice;
  }

  calculateTotalPrice(details: Booking[]): number {
    return details.reduce((sum, d) => sum + (d.totalPrice || 0), 0);
  }

  updateBookingPrices(details: BookingDetail[], roomList: Room[]): void {
    details.forEach(detail => {
      const room = roomList.find(r => r.id === detail.roomId);
      if (room && detail.checkinDate && detail.checkoutDate) {
        const days = this.calculateDays(detail.checkinDate, detail.checkoutDate);
        detail.price = this.calculatePrice(days, room.price);
      }
    });
  }
  checkIn(bookingId: number,roomId: number): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}`+`/booking/checkin/${bookingId}/${roomId}`, {});
  }
  checkOut(bookingId: number,roomId: number): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}`+`/booking/checkout/${bookingId}/${roomId}`, {});
  }
  createBooking(data: any): Observable<any> {
    return this.http.post<Booking>(`${environment.apiUrl}`+`/booking`, data);
  }
  getMyBookings(){
    return this.http.get<any[]>(`${environment.apiUrl}`+`/booking/my-bookings`)
  }
  getBookingDetail(bookingId: string): Observable<any>{
    return this.http.get<any[]>(`${environment.apiUrl}/booking/`+bookingId)
  }
  getAll(): Observable<Booking[]>{
     return this.http.get<Booking[]>(`${environment.apiUrl}`+`/booking/get_all`);
  }
  deleteBooking(bookingId: number): Observable<any>{
      return this.http.delete(`${environment.apiUrl}`+`/booking/delete/`+bookingId, {})
  }
}
