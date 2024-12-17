import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { ImageLoaderConfig } from '@angular/common';

import { IMAGE_LOADER } from '@angular/common';

const curriedImageKitLoader =
  (basePath: string) => (config: ImageLoaderConfig) => {
    const { src, width, loaderParams } = config;

    const basePathWithSlash = basePath.endsWith('/')
      ? basePath
      : basePath + '/';
    const srcWithSlash = src.startsWith('/') ? src : '/' + src;

    let queryParams: string[] = [];
    // does not seem to be necessary?
    if (width) queryParams.push(`w-${width}`);

    if (loaderParams) {
      queryParams.push(
        ...Object.entries(loaderParams).map(([key, value]) => `${key}-${value}`)
      );
    }

    const url =
      basePathWithSlash + 'tr:' + queryParams.join(',') + srcWithSlash;

    return url;
  };

function provideImageKitCustomLoader(basePath: string) {
  return {
    provide: IMAGE_LOADER,
    useFactory: () => curriedImageKitLoader(basePath),
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideImageKitCustomLoader('https://ik.imagekit.io/wozo7gejv/'),
  ],
});
