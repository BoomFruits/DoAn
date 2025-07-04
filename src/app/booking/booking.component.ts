import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { Room } from '../../model/room.model';
import { BookingService } from '../services/booking.service';
import { RoomService } from '../services/room.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomDetailComponent } from '../room-detail/room-detail.component';
import { User } from '../../model/user.model';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { Product } from '../../model/product.model';
import { Booking } from '../../model/booking.model';
import { BookingDetail } from '../../model/BookingDetail.model';
import { ServiceDetailItem } from '../../model/ServiceDetailItem.model';
import { BookingRequest } from '../../model/BookingRequest.model';
import { BookingDetailRequest } from '../../model/BookingDetailRequest.model';
import { SelectedService } from '../../model/SelectedService.model';

declare var bootstrap: any;
@Component({
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-booking',
  imports: [
    CommonModule,
    FormsModule,
    FlatpickrDirective,
    ReactiveFormsModule,
    RoomDetailComponent,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [provideFlatpickrDefaults()],
})
export class BookingComponent implements OnInit, DoCheck {
  rooms: Room[] = [];
  defaultRoom: Room | null = null;
  user!: User;
  selectedDateCheckin: Date = new Date();
  selectedDateCheckout: Date = new Date(
    new Date().setDate(new Date().getDate() + 1)
  );
  services: Product[] = []
  bookingData: BookingRequest = {
    customerId: this.authService.GetUserId(),
    staffId: null,
    note: '',
    paymentMethod: 'Cash',
    details: [
      {
        roomId: this.defaultRoom?.id ?? null,
        room_No: '',
          room_Name: '',
          bookingId: 0,
          isCheckedIn: false,
          isCheckedOut: false,
        checkinDate: this.selectedDateCheckin.toISOString(),
        checkoutDate: this.selectedDateCheckout.toISOString(),
        roomNote: '',
        price: 0,
        services: [] as {
          serviceId: number;
          amount: number;
          price: number;
        }[],
      },
    ],
  };
  groupedServices: { [key: string]: Product[] } = {};
categoryToggle: { [key: string]: boolean } = {}; // toggle trạng thái từng nhóm
  constructor(
    private bookingService: BookingService,
    private roomService: RoomService,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const roomIdParam = this.route.snapshot.paramMap.get('id');
    const roomId = roomIdParam ? parseInt(roomIdParam, 10) : null;
    this.loadRooms();
    this.loadService();
    const customerId = this.authService.GetUserId();
    if (customerId) {
      this.userService.getUserById(customerId).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (err) => {
          this.toastr.error('Không thể tải thông tin người dùng.');
        },
      });
    }
    if (roomId) {
      this.roomService.getRoomById(roomId).subscribe((room) => {
        this.defaultRoom = room;
        this.bookingData.details = [
          {
            roomId: room.id,
            room_No: room.room_No,
            room_Name: '',
            bookingId: 0,
            isCheckedIn: false,
            isCheckedOut: false,
            checkinDate: new Date(this.selectedDateCheckin).toISOString(),
            checkoutDate: new Date(this.selectedDateCheckout).toISOString(),
            roomNote: '',
            price: room.price,
            services: [] as {
              serviceId: number;
              amount: number;
              price: number;
            }[],
          },
        ];
      });
      console.log(this.bookingData)
    }
  }
  ngDoCheck() {
    this.bookingData.details.forEach((detail) => {
      const room = this.rooms.find((r) => r.id === detail.roomId);
      if (room && detail.checkinDate && detail.checkoutDate) {
        const days = this.calculateDays(
          detail.checkinDate,
          detail.checkoutDate
        );
        detail.price = days > 0 ? days * room.price : 0;
      }
    });
  }
  // Tính số ngày
  calculateDays(checkin: string | Date, checkout: string | Date): number {
    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.max(1, Math.round((+outDate - +inDate) / msPerDay));
  }
  // Tổng giá
  getTotalPrice(): number {
    let total = 0;
    for(const detail of this.bookingData.details){
      total += detail.price;
      if (detail.services) {
        for (const s of detail.services) {
          total += (s.amount || 1) * s.price;
        }
      }
    }
    return total
  }
  loadRooms() {
    this.roomService.getActiveRoom().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }
  loadService(){
    this.productService.getAll().subscribe((p) => {
      this.services = p.filter(p => p.isAvailable && p.stockQuantity != 0);
       this.groupServicesByCategory();
    })
  }
  isServiceSelected(detail: BookingDetailRequest, serviceId: number): boolean {
    return detail.services.some((s: SelectedService) => s.serviceId === serviceId);
  }
  getCategoryNames(): string[] {
    return Object.keys(this.groupedServices);
  }

  toggleCategory(category: string) {
    this.categoryToggle[category] = !this.categoryToggle[category];
  }
  toggleService(detail: BookingDetailRequest, service: Product) {
    const idx = detail.services.findIndex(
      (s: SelectedService) => s.serviceId === service.id
    );
    if (idx >= 0) {
      detail.services.splice(idx, 1);
    } else {
      detail.services.push({
        serviceId: service.id,
        amount: 1,
        price: service.price,
      });
    }
  }
  groupServicesByCategory() {
    this.groupedServices = {};
    this.categoryToggle = {};
    for (const s of this.services) {
      if (!this.groupedServices[s.categoryName]) {
        this.groupedServices[s.categoryName] = [];
        this.categoryToggle[s.categoryName] = true; // mặc định mở
      }
      this.groupedServices[s.categoryName].push(s);
    }
  }
  getServiceQty(detail: BookingDetailRequest, serviceId: number): number {
    const s = detail.services.find((s: SelectedService) => s.serviceId === serviceId);
    return s ? s.amount : 1;
  }

  updateServiceQty(detail: BookingDetailRequest, serviceId: number, qty: number) {
    const s = detail.services.find((s: SelectedService) => s.serviceId === serviceId);
    if (s){
      s.amount = +qty;
      detail.services = [...detail.services]; 
    }
  }
  addRoom() {
    this.bookingData.details.push({
      roomId: null,
      room_No: '',
       room_Name: '',
       bookingId: 0,
    isCheckedIn: false,
    isCheckedOut: false,
      checkinDate: new Date(this.selectedDateCheckin).toISOString(),
      checkoutDate: new Date(this.selectedDateCheckout).toISOString(),
      roomNote: '',
      price: 0,
      services: [],
    });
  }
  viewRoom(roomId: number | null) {
    if (roomId) {
      const room = this.rooms.find((r) => r.id === roomId);
      if (room) {
        this.openBookingModal(room);
      }
    }
  }
  isRoomAlrSelected(roomId: number): boolean {
    return this.bookingData.details.some((d) => d.roomId == roomId);
  }
  removeDetail(index: number) {
    this.bookingData.details.splice(index, 1);
  }
  submitBooking(): void {
    if (!this.user) {
      this.toastr.info('Đang tải thông tin người dùng. Vui lòng đợi...');
      return;
    } else {
      this.bookingData.details = this.bookingData.details.map((d) => ({
        ...d,
        checkinDate: new Date(d.checkinDate).toISOString(),
        checkoutDate: new Date(d.checkoutDate).toISOString(),
      }));
      this.bookingService.createBooking(this.bookingData).subscribe({
        next: (res) => {
          this.toastr.success('Đặt phòng thành công!');
          const bookingId = res.bookingId;
          this.router.navigate(['/payment', bookingId]);
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            const msg = err.error.message || 'Đặt phòng thất bại.';
            const details = Array.isArray(err.error.errors)
              ? err.error.errors.join('<br/>')
              : '';
            this.toastr.error(`${msg}<br/>${details}`, 'Lỗi', {
              enableHtml: true,
            });
          } else {
            this.toastr.error('Không thể kết nối máy chủ. Vui lòng thử lại.');
          }
        },
      });
    }
  }
  openBookingModal(room: Room) {
    this.defaultRoom = room;
    const modal = new bootstrap.Modal(document.getElementById('topUpModal'));
    modal.show();
  }
}
