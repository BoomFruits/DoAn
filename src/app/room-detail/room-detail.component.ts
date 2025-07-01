import { AfterViewInit, Component, ElementRef, Input, NgModule, OnInit , Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Room } from '../../model/room.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomService } from '../services/room.service';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { BookingComponent } from '../booking/booking.component';

declare var bootstrap : any;
declare var $:any;
@Component({
  selector: 'app-room-detail',
  imports: [CommonModule],
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.scss'
})
export class RoomDetailComponent implements OnInit{
 @Input() room: any;
  @ViewChild('topUpModal') topUpModal!: ElementRef;
  selectedDateCheckin: Date = new Date();
  selectedDateCheckout: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // mặc định 1 ngày
  showBooking = false;
  constructor(private router: Router,private roomServie : RoomService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.roomServie.getRoomById(+id).subscribe(room => {
        this.room = room;
      });
    }
  }

  navigateToBooking(room: Room) {
    console.log("booking room: ",room);
    this.router.navigate(['/booking',room.id]);
  }
}
