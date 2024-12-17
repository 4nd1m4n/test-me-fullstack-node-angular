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
} from '@rx-angular/template/experimental/virtual-scrolling';

import {
  ImageDataService,
  splitArrayIntoChunks,
} from '../services/image-data.service';

import { NgxVirtualScrollModule } from '@lithiumjs/ngx-virtual-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
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
    NgxVirtualScrollModule,
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
