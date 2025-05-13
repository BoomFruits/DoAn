import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Room } from '../../model/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
   rooms: Room[] = [];
  room: Room = this.emptyRoom();
  constructor(private roomService: RoomService){}
  ngAfterViewInit(): void {
    const spinner = document.getElementById('spinner');
    if(spinner){
      spinner.classList.remove('show');
    }
    
  }
  // ngAfterViewInit(): void {
  //   // WOW.js animation init
  //   if (typeof WOW !== 'undefined') {
  //     new WOW().init();
  //   }

  //   // Owl Carousel init
  //   if ($('.owl-carousel').length > 0) {
  //     $('.owl-carousel').owlCarousel({
  //       autoplay: true,
  //       smartSpeed: 1000,
  //       items: 1,
  //       loop: true,
  //       nav: true,
  //       dots: true
  //     });
  //   }

  //   // Tempus Dominus datetimepicker init
  //   if ($('#date1').length > 0) {
  //     $('#date1').datetimepicker({
  //       format: 'L'
  //     });
  //   }
  //   if ($('#date2').length > 0) {
  //     $('#date2').datetimepicker({
  //       format: 'L'
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.loadRooms();
  }
  loadRooms(){
    this.roomService.getAll().subscribe(data => this.rooms = data);
  }
  submitRoom(){
    if(this.room.id){
      this.roomService.update(this.room.id,this.room).subscribe(() => {
        this.loadRooms();
        this.room = this.emptyRoom();
      })
    }
  }
  updateRoom(r: Room){
    this.room = {...r};
  }
  deleteRoom(id: number){
    this.roomService.delete(id);
  }
  emptyRoom():Room{
    return{
      room_No: '',
      capacity: 1,
      type: '',
      price: 0 ,
      isAvailable:true,
      image: '',
    }
  }
}
