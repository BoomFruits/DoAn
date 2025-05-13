import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  BgColorDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardTextDirective,
  CardTitleDirective,
  ColComponent,
  ColDirective,
  PlaceholderAnimationDirective,
  PlaceholderDirective,
  RowComponent
} from '@coreui/angular';
import { DocsExampleComponent } from '../../../components/public-api';

@Component({
    selector: 'app-placeholders',
    templateUrl: './placeholders.component.html',
    styleUrls: ['./placeholders.component.scss'],standalone:true,
    imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, CardImgDirective, CardTitleDirective, CardTextDirective, ButtonDirective, ColDirective, RouterLink, PlaceholderAnimationDirective, PlaceholderDirective, BgColorDirective]
})
export class PlaceholdersComponent {

}
