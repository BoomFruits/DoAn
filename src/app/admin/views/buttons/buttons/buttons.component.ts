import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';

import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular';
import { DocsExampleComponent } from '../../../components/public-api';

@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html',
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ButtonDirective, IconDirective, RouterLink]
})
export class ButtonsComponent {

  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

}
