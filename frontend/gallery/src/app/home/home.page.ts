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
} from '@ionic/angular/standalone';
import { ImageComponent } from '../image/image.component';

import { DataService, Image } from '../services/image-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    ImageComponent,
  ],
})
export class HomePage {
  public imageFilenames: any;
  public images: any;

  constructor(private dataService: DataService) {
    this.dataService.getImageFilenames().subscribe((res) => {
      console.log(res);

      this.imageFilenames = res;
      this.images = this.dataService.getImagesByFilenames(this.imageFilenames);
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getImages(): Image[] {
    return this.images;
  }
}
