import { Component } from '@angular/core';
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
export class AdminBookingComponent {
  bookings: Booking[] = [];
  keyword: string = '';

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
        return 'Pending';
      case 1:
        return 'Confirmed';
      case 2:
        return 'Canceled';
      default:
        return 'Pending';
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
    this.bookingService.checkIn(bookingId,roomId).subscribe((res) => {
      this.toastr.success('Checked in!');
      detail.isCheckedIn = true;
    });
  }

  checkOut(bookingId: number, roomId: number, detail: BookingDetail) {
    this.bookingService.checkOut(bookingId,roomId).subscribe(() => {
      this.toastr.success('Checked out!');
      detail.isCheckedOut = true;
    });
  }
  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('vi-VN');
  }
}
