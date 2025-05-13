import { importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './admin.routes';
import { iconSubset } from './icons/icon-subset';

export const adminProviders = [
  provideRouter(
    routes,
    withRouterConfig({ onSameUrlNavigation: 'reload' }),
    withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    withEnabledBlockingInitialNavigation(),
    withViewTransitions(),
    withHashLocation()
  ),
  importProvidersFrom(SidebarModule, DropdownModule),
  {
    provide: IconSetService,
    useFactory: () => {
      const iconSetService = new IconSetService();
      iconSetService.icons = { ...iconSubset };
      return iconSetService;
    }
  }
];