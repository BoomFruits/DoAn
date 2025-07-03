import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Room } from '../../../../model/room.model';
import { FormModule } from '@coreui/angular';

import { RoomFormComponent } from "../room-form/room-form.component";
import { AdminRoomService } from '../../../services/adminroom.service';
import { environment } from '../../../../../environment';
declare var bootstrap : any;
@Component({
  selector: 'app-room-list',
  imports: [CommonModule, FormModule, ReactiveFormsModule, RoomFormComponent],
  standalone:true,
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit {
  private modalInstance: any;
  imageUrl = environment.imageUrl;
  rooms: Room[] = [];
  editRoomId = 0;
  isEditing = false;
  editingRoom: any = null;
 constructor(private fb: FormBuilder, private roomService: AdminRoomService) {
 
  }
  ngOnInit(): void {
    this.loadRooms();
  }
  loadRooms(){
    this.roomService.getRooms().subscribe(data => this.rooms = data);
  }
  openModal(){
    const modalEl = document.getElementById("addRoomModal");
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
    this.isEditing = false;
    this.editingRoom = null;
  }

  onEdit(room: Room) {
    this.isEditing = true;
      this.roomService.getRoomById(room.id).subscribe(fullRoom => {
    this.editingRoom = fullRoom;
    const modalEl = document.getElementById("addRoomModal");
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
    });
  }
  onDelete(id: number) {
    if (confirm('Delete this room?')) {
      this.roomService.deleteRoom(id).subscribe(() => this.loadRooms());
    }
  }

onFormSaved() {
  this.loadRooms();
}
}
