import { ApplicationConfig, isDevMode, PLATFORM_ID, inject } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const scrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, scrollingFeature),
    provideClientHydration(),
    provideStore(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        (req, next) => {
          // Check if we're in the browser environment
          if (isPlatformBrowser(inject(PLATFORM_ID))) {
            const token = localStorage.getItem('token');
            if (token) {
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
            }
          }
          return next(req);
        }
      ])
    ),
    {
      provide: 'FONT_LOADING_STRATEGY',
      useValue: 'swap' // or 'block' or 'optional'
    }
  ],
};
