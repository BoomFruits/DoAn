import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Room } from '../../model/room.model';
import { RoomService } from '../services/room.service';
import { environment } from '../../../environment';

@Component({
    selector: 'app-app-room-card',
    imports: [FormsModule, CommonModule],
    standalone:true,
    encapsulation:ViewEncapsulation.None,
    templateUrl: './app-room-card.component.html',
    styleUrl: './app-room-card.component.scss'
})
export class AppRoomCardComponent {
  imageUrl = environment.imageUrl;
   rooms: Room[] = [];
   selectedRoom!: Room;
   selectedDateCheckin: Date = new Date();
   selectedDateCheckout: Date = new Date();
  constructor(private roomService: RoomService){}
  updateTimeCheckIn(date: Date){
    this.selectedDateCheckin = date;
  }
  updateTimeCheckOut(date :Date){
    this.selectedDateCheckout = date;
  }
  ngOnInit(): void {
    this.loadRooms();

  }
  loadRooms(){
    this.roomService.getActiveRoom().subscribe(data => this.rooms = data);
  }
}
