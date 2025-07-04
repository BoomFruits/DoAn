import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookingDetail } from '../../model/BookingDetail.model';
import { BookingService } from '../services/booking.service';
import { FormModule } from '@coreui/angular';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Room } from '../../model/room.model';
import { Booking } from '../../model/booking.model';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-booking-history',
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  imports: [CommonModule,FormsModule,NgxPaginationModule],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.scss'
})
export class BookingHistoryComponent implements OnInit{
  makePayment(bookingId: number) {
    this.router.navigate(['/payment',bookingId])
  }
  cancelBooking(bookingId: number): void {
  if (confirm('Bạn có chắc muốn huỷ đặt phòng?')) {
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.toastr.success('Huỷ đặt phòng thành công');
        this.loadBookings(); 
      },
      error: (err) => {
        this.toastr.error('Huỷ đặt phòng thất bại', err);
      }
    });
  }
}
  loadBookings(){
  this.bookingService.getMyBookings().subscribe(data => {
        this.bookings = data;
      })
  }
  viewRoom(roomId: number) {
    this.router.navigate(['/room',roomId])
  }
  getServicesForRoom(booking: any, roomId: number) {
    return booking.services.filter((s: Room) => s.id === roomId);
  }
  bookings : Booking[] = [];
  paymentMethods: string[] =['Tiền mặt', 'VNPay', 'PayPal'];
  selectedPaymentMethod: string = '';
    statuses = [
    { value: 0, label: 'Chờ thanh toán' },
    { value: 1, label: 'Đã thanh toán' },
    { value: 2, label: 'Đã huỷ' },
    { value: 3, label: 'Hoàn tất' }
  ];
  keyword: string = '';
    selectedStatuses: number[] = [];
    itemsPerPage = 6;
    currentPage = 0;
  constructor(private bookingService: BookingService,private router: Router,private toastr: ToastrService){}
  ngOnInit(): void {
    this.loadBookings()
    this.filters()
  }
  filters(): Booking[] {
      return this.bookings.filter(b => {
      const matchPayment = this.selectedPaymentMethod
        ? b.paymentMethod === this.selectedPaymentMethod
        : true;

      const matchStatus = this.selectedStatuses.length
        ? this.selectedStatuses.includes(b.status)
        : true;
      return (
        matchPayment &&
        matchStatus
      );
    });
  }
  toggleStatus(status: number) {
    const idx = this.selectedStatuses.indexOf(status);
    if (idx >= 0) {
      this.selectedStatuses.splice(idx, 1);
    } else {
      this.selectedStatuses.push(status);
    }
    this.filters();
  }
  getBookingStatusLabel(booking: Booking): string {
    if (booking.status === 0) return 'Chờ thanh toán';
    if (booking.status === 2) return 'Đã huỷ';
    if(booking.status == 3) return 'Hoàn tất'
    if (booking.status === 1 && booking.details) {
      const allNotCheckedIn = booking.details.every((d: BookingDetail) => !d.isCheckedIn);  
      if (allNotCheckedIn) return 'Chưa check-in';
      return 'Đã check-in';
    }

    return 'Không xác định';
  }
}
