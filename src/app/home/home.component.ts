import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { AppComponent } from '../app.component';
import { BookingComponent } from "../booking/booking.component";
import { AppRoomCardComponent } from "../app-room-card/app-room-card.component";
import { RouterLink } from '@angular/router';
import { NewsletterComponent } from "../newsletter/newsletter.component";

@Component({
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  selector: 'app-home',
  imports: [AppRoomCardComponent, RouterLink, NewsletterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
