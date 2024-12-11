import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { ImageComponent } from '../image/image.component';

import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
} from '@rx-angular/template/experimental/virtual-scrolling';

import {
  ImageDataService,
  Image,
  splitArrayIntoChunks,
} from '../services/image-data.service';

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
        IonList,
        IonGrid,
        IonRow,
        IonCol,
        ImageComponent,
        FixedSizeVirtualScrollStrategy,
        RxVirtualScrollViewportComponent,
        RxVirtualFor,
    ]
})
export class HomePage {
  public images: any;
  public imagesGrid: any;

  constructor(private imageService: ImageDataService) {
    this.imageService.getImages(0, 9).subscribe((response) => {
      this.images = response;
      this.imagesGrid = splitArrayIntoChunks(this.images, 3);

      console.log(this.imagesGrid);
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  // getImages(): Image[] {
  //   return this.images;
  // }

  // imagesGrid(): Image[][] {
  //   return this.imagesGrid
  // }
}
