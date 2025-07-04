import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControlDirective, FormsModule } from '@angular/forms';
import { Room } from '../../model/room.model';
import { BookingDetail } from '../../model/BookingDetail.model';
import {
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../services/room.service';
import { RoomDetailComponent } from '../room-detail/room-detail.component';
import { environment } from '../../../environment';
import {  ButtonDirective, DropdownComponent, DropdownMenuDirective, DropdownModule, DropdownToggleDirective, FormDirective } from '@coreui/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsletterComponent } from "../newsletter/newsletter.component";
declare var bootstrap: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FormsModule, RoomDetailComponent, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective,
    DropdownModule, FormDirective, ButtonDirective, NgxPaginationModule, NewsletterComponent],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [provideFlatpickrDefaults()],
})
export class RoomComponent {
  rooms: Room[] = [];
  selectedRoom!: Room;
  imageUrl = environment.imageUrl;
  bookingData: BookingDetail[] = [];
  selectedDateCheckin: Date = new Date();
  selectedDateCheckout: Date = new Date();
  keyword: string = '';
  filterType: string = ''; // loại phòng
  filterCapacity: number | null = null; 
  filterMinPrice: number | null = null;
  filterMaxPrice: number | null = null;
  //phân trang
  currentPage = 1;
  itemsPerPage = 6;
  constructor(private roomService: RoomService, private router: Router) {}
  updateTimeCheckIn(date: Date) {
    this.selectedDateCheckin = date;
  }
  updateTimeCheckOut(date: Date) {
    this.selectedDateCheckout = date;
  }
  ngOnInit(): void {
    this.loadRooms();
  }
  search(): Room[] {
    const kw = this.keyword.toLowerCase().trim();

    return this.rooms.filter((r) => {
      const matchesKeyword =
        r.type.toLowerCase().includes(kw) ||
        r.room_Name.toLowerCase().includes(kw) ||
        r.room_No.includes(kw);

      const matchesType = this.filterType ? r.type === this.filterType : true;
      const matchesCapacity = this.filterCapacity
        ? r.capacity >= this.filterCapacity
        : true;
      const matchesMinPrice =
        this.filterMinPrice !== null ? r.price >= this.filterMinPrice : true;
      const matchesMaxPrice =
        this.filterMaxPrice !== null ? r.price <= this.filterMaxPrice : true;

      return (
        matchesKeyword &&
        matchesType &&
        matchesCapacity &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }
  loadRooms() {
    // this.roomService.getAllRooms().subscribe(data => this.rooms = data); //load all room even active room
    this.roomService.getActiveRoom().subscribe((data) => (this.rooms = data));
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
  openModal(room: Room): void {
    this.selectedRoom = room;
    const modal = new bootstrap.Modal(document.getElementById('topUpModal'));
    modal.show();
  }
  openBooking(room: Room) {
    this.router.navigate(['/booking',room.id]);
  }

  
}
