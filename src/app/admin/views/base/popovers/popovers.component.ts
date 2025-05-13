import { Component, OnInit } from '@angular/core';

import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, PopoverDirective } from '@coreui/angular';
import { DocsExampleComponent } from '../../../components/docs-example/docs-example.component';

@Component({
    selector: 'app-popovers',
    templateUrl: './popovers.component.html',
    styleUrls: ['./popovers.component.scss'],
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ButtonDirective, PopoverDirective]
})
export class PopoversComponent implements OnInit {

  visible = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = !this.visible;
    }, 3000);
  }

}
