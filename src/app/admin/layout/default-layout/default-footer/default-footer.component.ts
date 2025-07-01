import { Component, inject } from '@angular/core';
import { ColorModeService, FooterComponent } from '@coreui/angular';

@Component({
    selector: 'app-default-footer',
    templateUrl: './default-footer.component.html',
    styleUrls: ['./default-footer.component.scss'],
    standalone:true
})
export class DefaultFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
