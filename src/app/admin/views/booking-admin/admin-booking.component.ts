import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Booking } from '../../../../model/booking.model';
import { BookingService } from '../../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BookingDetail } from '../../../../model/BookingDetail.model';

@Component({
  selector: 'app-admin-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-booking.component.html',
  styleUrl: './admin-booking.component.scss',
})
export class AdminBookingComponent  implements OnInit{
  bookings: Booking[] = [];
  keyword: string = '';
  message: string = '';
  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getAll().subscribe((res) => (this.bookings = res));
  }
  getStatusName(s: number) {
    switch (s) {
      case 0:
        return 'Chờ';
      case 1:
        return 'Xác nhận thanh toán';
      case 2:
        return 'Huỷ';
      default:
        return 'Hoàn thành';
    }
  }
  search(): Booking[] {
    const kw = this.keyword.toLowerCase().trim();
    return this.bookings.filter(
      (b) =>
        b.userEmail.toLowerCase().includes(kw) ||
        b.userName.toLowerCase().includes(kw) ||
        b.paymentMethod.toLowerCase().includes(kw)
    );
  }
  checkIn(bookingId: number, roomId: number, detail: BookingDetail) {
    this.bookingService.checkIn(bookingId,roomId).subscribe({
      next: (res) => {
        this.message = res.message;
        this.toastr.success(this.message);
        detail.isCheckedIn = true;
      },error: (err) => {
          this.message = err.message;
          this.toastr.error(this.message);
      }
    });
  }

  checkOut(bookingId: number, roomId: number, detail: BookingDetail) {
    this.bookingService.checkOut(bookingId,roomId).subscribe({
      next: (res) => {
        this.message = res.message;
        this.toastr.success(this.message);
        detail.isCheckedOut = true;
      },error: (err) => {
          this.message = err.message;
          this.toastr.error(this.message);
      }
    });
  }
  deleteBooking(bookingId: number){
    if(confirm("Bạn có chắc xoá đặt phòng này?"))
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: (res) => {
        this.message = res.message;
        this.toastr.success(this.message);
      },error: (err) => {
          this.message = err.message;
        this.toastr.error(this.message);
      }
    })
    this.loadBookings();
  }
  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('vi-VN');
  }
}
