import { Component, ViewEncapsulation } from '@angular/core';
import { BookingDetail } from '../../model/BookingDetail.model';
import { BookingService } from '../services/booking.service';
import { Booking } from '../../model/booking.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from "../newsletter/newsletter.component";

@Component({
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-booking-detail',
  imports: [CommonModule, NewsletterComponent],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  booking!: Booking;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const bookingId = +this.route.snapshot.paramMap.get('id')!;
    this.bookingService.getBookingDetail(bookingId).subscribe({
      next: (data) => (this.booking = data),
      error: (err) => console.error('Lỗi tải booking', err),
    });
  }
  makePayment(bookingId: number) {
    this.router.navigate(['/payment', bookingId]);
  }
  viewRoom(roomId: number) {
    this.router.navigate(['/room', roomId]);
  }
  getBookingStatusLabel(booking: Booking): string {
    if (booking.status === 0) return 'Chờ thanh toán';
    if (booking.status === 2) return 'Đã huỷ';
    if (booking.status == 3) return 'Hoàn tất';
    if (booking.status === 1 && booking.details) {
      const allNotCheckedIn = booking.details.every(
        (d: BookingDetail) => !d.isCheckedIn
      );
      if (allNotCheckedIn) return 'Chưa check-in';
      return 'Đã check-in';
    }

    return 'Không xác định';
  }
  getServiceTotal(detail: BookingDetail): number {
    let total = 0;
    for (let service of detail.services) {
      total  += service.amount * service.price;
    }
    return total;
  }

  getTotalRoomAndService(detail: BookingDetail): number {
    return detail.totalAmount + this.getServiceTotal(detail);
  }
}
