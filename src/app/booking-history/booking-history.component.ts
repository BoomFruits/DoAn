import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookingDetail } from '../../model/BookingDetail.model';
import { BookingService } from '../services/booking.service';
import { FormModule } from '@coreui/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Room } from '../../model/room.model';


@Component({
  selector: 'app-booking-history',
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.scss'
})
export class BookingHistoryComponent implements OnInit{
  makePayment(bookingId: number) {
    this.router.navigate(['/payment',bookingId])
  }
  cancelBooking(bookingId: number): void {
  if (confirm('Are you sure you want to cancel this booking?')) {
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.toastr.success('Booking canceled successfully');
        this.loadBookings(); // Refresh list nếu cần
      },
      error: (err) => {
        console.error('Cancel booking failed', err);
        this.toastr.error('Failed to cancel booking');
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
  bookings : any[] = [];
  constructor(private bookingService: BookingService,private router: Router,private toastr: ToastrService){}
  ngOnInit(): void {
    this.loadBookings()
  }

}
