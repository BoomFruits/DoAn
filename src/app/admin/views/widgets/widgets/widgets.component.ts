import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { WidgetsBrandComponent } from '../widgets-brand/widgets-brand.component';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetsEComponent } from '../widgets-e/widgets-e.component';
import { WidgetsDropdownComponent } from '../widgets-dropdown/widgets-dropdown.component';

import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, RowComponent, ColComponent, WidgetStatBComponent, ProgressBarDirective, ProgressComponent, WidgetStatFComponent, TemplateIdDirective, CardGroupComponent, WidgetStatCComponent } from '@coreui/angular';
import { DocsExampleComponent } from "../../../components/docs-example/docs-example.component";


@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone:true,
    imports: [TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, WidgetsDropdownComponent, RowComponent, ColComponent, WidgetStatBComponent, ProgressBarDirective, ProgressComponent, WidgetsEComponent, WidgetStatFComponent, TemplateIdDirective, IconDirective, WidgetsBrandComponent, CardGroupComponent, WidgetStatCComponent, DocsExampleComponent]
})
export class WidgetsComponent implements AfterContentInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
