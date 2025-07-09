import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ColorModeService, DropdownModule, SidebarModule } from '@coreui/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { iconSubset } from './admin/icons/icon-subset';
import { adminProviders } from './admin/admin.config';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { provideToastr } from 'ngx-toastr';
import { SocialLoginModule,SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';


export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes,withViewTransitions()),
    importProvidersFrom(AuthModule),
    provideHttpClient(withFetch(),withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimations(),
    provideToastr({ positionClass: 'toast-bottom-right' }),
    provideToastr(),
     {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1061806594538-0l09jakollsqe88eln37pq4o4vlvr87k.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('2249061055496087',{
              scope: 'email,public_profile'
            })
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    },
    ...adminProviders
  ]
};
