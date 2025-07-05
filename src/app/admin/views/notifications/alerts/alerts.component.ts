import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AlertComponent,
  AlertHeadingDirective,
  AlertLinkDirective,
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TemplateIdDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsExampleComponent } from "../../../components/docs-example/docs-example.component";
// import { DocsExampleComponent } from '../../../components/public-api';


@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
    standalone:true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AlertComponent, AlertLinkDirective, RouterLink, AlertHeadingDirective, IconDirective, TemplateIdDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, DocsExampleComponent]
})
export class AlertsComponent implements OnInit {

  visible = [true, true];
  dismissible = true;

  constructor() { }

  ngOnInit(): void {
  }

  onAlertVisibleChange(eventValue: any = this.visible) {
    this.visible[1] = eventValue;
  }

  onResetDismiss() {
    this.visible = [true, true];
  }

  onToggleDismiss() {
    this.dismissible = !this.dismissible;
  }

}
