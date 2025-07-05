import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FlatpickrDirective } from 'angularx-flatpickr';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { NewsletterComponent } from "../newsletter/newsletter.component";

@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-service',
  imports: [CommonModule, FormsModule, NewsletterComponent],
  standalone:true,
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

}
