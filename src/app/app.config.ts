import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ColorModeService, DropdownModule, SidebarModule } from '@coreui/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { iconSubset } from './admin/icons/icon-subset';
import { adminProviders } from './admin/admin.config';


export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
    ...adminProviders
  ]
};
