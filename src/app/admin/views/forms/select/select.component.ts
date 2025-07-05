import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormSelectDirective } from '@coreui/angular';
import { DocsExampleComponent } from "../../../components/docs-example/docs-example.component";

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],

    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormSelectDirective, ReactiveFormsModule, DocsExampleComponent]
})
export class SelectComponent {

  constructor() { }

}
