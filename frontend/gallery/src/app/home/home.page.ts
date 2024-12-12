import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { ImageComponent } from '../image/image.component';

import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
} from '@rx-angular/template/experimental/virtual-scrolling';

import {
  ImageDataService,
  Image,
  splitArrayIntoChunks,
} from '../services/image-data.service';
import {
  RX_RENDER_STRATEGIES_CONFIG,
  RxRenderStrategiesConfig,
} from '@rx-angular/cdk/render-strategies';

const COMPONENT_RX_ANGULAR_CONFIG: RxRenderStrategiesConfig<string> = {
  // NOTE: 'immediate' seemed the best so far
  // [see](https://www.rx-angular.io/docs/cdk/render-strategies#features)
  primaryStrategy: 'immediate',
  patchZone: false,
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonGrid,
    IonRow,
    IonCol,
    ImageComponent,
    FixedSizeVirtualScrollStrategy,
    RxVirtualScrollViewportComponent,
    RxVirtualFor,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useValue: COMPONENT_RX_ANGULAR_CONFIG,
    },
    {
      provide: RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
      useValue: {
        // NOTE: this had the biggest impact on the "creeping-white-space" problem on blazing scrolls
        // It's probably a good idea to have these values be some factor of the number of items visible at once in the
        // scrolling view.
        runawayItemsOpposite: 50,
        runawayItems: 50,
        templateCacheSize: 100,
      },
    },
  ],
})
export class HomePage {
  public images: any;
  public imagesGrid: any;

  public rowSize: number = 100;

  constructor(private imageService: ImageDataService) {
    this.imageService.getImages(0, 1000).subscribe((response) => {
      this.images = response;
      this.imagesGrid = splitArrayIntoChunks(this.images, 3);
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
}
