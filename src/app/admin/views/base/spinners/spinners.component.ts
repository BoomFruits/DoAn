import { Component } from '@angular/core';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, SpinnerComponent, ButtonDirective } from '@coreui/angular';
import { DocsExampleComponent } from '../../../components/docs-example/docs-example.component';

@Component({
    selector: 'app-spinners',
    templateUrl: './spinners.component.html',
    styleUrls: ['./spinners.component.scss'],
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, SpinnerComponent, ButtonDirective]
})
export class SpinnersComponent {

  constructor() { }

}
