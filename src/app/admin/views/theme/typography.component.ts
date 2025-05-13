import { Component } from '@angular/core';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, BadgeComponent, BadgeModule } from '@coreui/angular';

@Component({
    templateUrl: 'typography.component.html',
    standalone:true,
    imports: [
        TextColorDirective,
        CardComponent,
        CardHeaderComponent,
        CardBodyComponent,
        BadgeModule
    ]
})
export class TypographyComponent {
  constructor() {}
}
