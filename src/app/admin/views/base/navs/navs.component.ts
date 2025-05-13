import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, NavComponent, NavItemComponent, NavLinkDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective } from '@coreui/angular';
import { DocsExampleComponent } from '../../../components/public-api';

@Component({
    selector: 'app-navs',
    templateUrl: './navs.component.html',
    styleUrls: ['./navs.component.scss'],
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, NavComponent, NavItemComponent, NavLinkDirective, RouterLink, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective]
})
export class NavsComponent {

  constructor() { }
}

