import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, PaginationComponent, PageItemComponent, PageLinkDirective } from '@coreui/angular';
import { DocsExampleComponent } from '../../../components/public-api';

@Component({
    selector: 'app-paginations',
    templateUrl: './paginations.component.html',
    styleUrls: ['./paginations.component.scss'],
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, PaginationComponent, PageItemComponent, PageLinkDirective, RouterLink]
})
export class PaginationsComponent {

  constructor() { }

}
