import { map } from 'rxjs';
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
import { ImageLoaderConfig, provideImageKitLoader } from '@angular/common';

import { IMAGE_LOADER } from '@angular/common';

// @NgModule({
//   // ...
//   providers: [
//     {
//       provide: IMAGE_LOADER,
//       useFactory: () => imagekitLoader,
//     },
//   ],
// })
// export class YourModule {}

// function imagekitLoader(config: ImageLoaderConfig): string {
//   const { src, width, loaderParams } = config;

//   // Extract crop mode from loaderParams if present
//   const cropMode = loaderParams?.['crop_mode'];

//   // Construct the ImageKit URL
//   const baseUrl = 'https://ik.imagekit.io/wozo7gejv/';
//   // let url = `${baseUrl}/image/${src}`;
//   let url = `${baseUrl}${src}`;

//   // Add width parameter if specified
//   if (width) {
//     url += `?width=${width}`;
//   }

//   // Add crop mode parameter if specified
//   if (cropMode) {
//     url += `&cm=${cropMode}`;
//   }

//   return url;
// }

// const curriedImagekitLoader =
//   (basePath: string) => (config: ImageLoaderConfig) => {
//     const { src, width, loaderParams } = config;

//     // // Extract crop mode from loaderParams if present
//     // const cropMode = loaderParams?.['crop_mode'];
//     // const height = loaderParams?.['height'];

//     const basePathWithSlash = basePath.endsWith('/')
//       ? basePath
//       : basePath + '/';
//     const srcWithSlash = src.startsWith('/') ? src : '/' + src;

//     // let url = basePathWithSlash + srcWithSlash + '?';

//     let queryParams: string[] = [];

//     const pushDefinedParams = (parameter: any, queryPart: string) => {
//       if (parameter) queryParams.push(queryPart + String(parameter));
//     };

//     pushDefinedParams(width, 'w-');
//     // pushDefinedParams(loaderParams?.['height'], 'h-');
//     pushDefinedParams(loaderParams?.['crop_mode'], 'cm-');

//     // if (config.width) queryParams.push(`w=${config.width}`);
//     // if (loaderParams?.['height'])
//     //   queryParams.push(`h=${loaderParams?.['height']}`);
//     // if (loaderParams?.['crop_mode'])
//     //   queryParams.push(`cm=${loaderParams?.['crop_mode']}`);

//     // if (config.width) {
//     //   queryParams.push(`w=${config.width}`);
//     // }
//     // if (config.loaderParams?.roundedCorners) {
//     //   queryParams.push('mask=corners&corner-radius=5');
//     // }
//     // return url + queryParams.join('&');

//     // Add width parameter if specified
//     // if (width) {
//     //   url += `?width=${width}`;
//     // }

//     // // Add crop mode parameter if specified
//     // if (cropMode) {
//     //   url += `&cm=${cropMode}`;
//     // }

//     const url =
//       basePathWithSlash + 'tr:' + queryParams.join(',') + srcWithSlash;

//     return url + queryParams.join('&');

//     // return url;
//   };

// const pick = (obj: Object, arr: Array<string>) =>
//   Object.fromEntries(Object.entries(obj).filter(([k]) => arr.includes(k)));

// const omit = (obj: Object, arr: Array<string>) =>
//   Object.fromEntries(Object.entries(obj).filter(([k]) => !arr.includes(k)));

const curriedImagekitLoader =
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
    // useFactory: () => () => imagekitLoader(basePath),
    useFactory: () => curriedImagekitLoader(basePath),
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    // provideImageKitLoader('https://ik.imagekit.io/wozo7gejv/'),
    // {
    //   provide: IMAGE_LOADER,
    //   useFactory: () => imagekitLoader,
    // },
    provideImageKitCustomLoader('https://ik.imagekit.io/wozo7gejv/'),
  ],
});
