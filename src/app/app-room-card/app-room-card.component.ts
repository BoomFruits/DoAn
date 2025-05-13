import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-app-room-card',
    imports: [FormsModule, CommonModule],
    standalone:true,
    templateUrl: './app-room-card.component.html',
    styleUrl: './app-room-card.component.scss'
})
export class AppRoomCardComponent {
  @Input() room:any;
}
