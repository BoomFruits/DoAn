import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormControlDirective, FormLabelDirective, FormDirective, FormSelectDirective, GutterDirective } from '@coreui/angular';
import { DocsExampleComponent } from '../../../components/public-api';

@Component({
    selector: 'app-floating-labels',
    templateUrl: './floating-labels.component.html',
    styleUrls: ['./floating-labels.component.scss'],
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormFloatingDirective, FormControlDirective, FormLabelDirective, ReactiveFormsModule, FormsModule, FormDirective, NgStyle, FormSelectDirective, GutterDirective]
})
export class FloatingLabelsComponent {

  constructor() { }

}
