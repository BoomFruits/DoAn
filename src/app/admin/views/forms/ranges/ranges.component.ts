import { Component } from '@angular/core';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormLabelDirective, FormControlDirective } from '@coreui/angular';
import { DocsExampleComponent } from '../../../components/docs-example/docs-example.component';



@Component({
    selector: 'app-ranges',
    templateUrl: './ranges.component.html',
    styleUrls: ['./ranges.component.scss'],
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormLabelDirective, FormControlDirective]
})
export class RangesComponent {

  constructor() { }

}
