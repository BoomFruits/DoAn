import { Component } from '@angular/core';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, BadgeComponent, ButtonDirective, BorderDirective } from '@coreui/angular';
import { DocsExampleComponent } from "../../../components/docs-example/docs-example.component";
// import { DocsExampleComponent } from '../../../components/public-api';

@Component({
    selector: 'app-badges',
    templateUrl: './badges.component.html',
    styleUrls: ['./badges.component.scss'],
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, BadgeComponent, ButtonDirective, BorderDirective, DocsExampleComponent]
})
export class BadgesComponent {

  constructor() { }

}
