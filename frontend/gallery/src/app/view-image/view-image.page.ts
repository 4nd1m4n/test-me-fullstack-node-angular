import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Platform,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonLabel,
  IonImg,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { ImageDataService, Image } from '../services/image-data.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.page.html',
  styleUrls: ['./view-image.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonItem,
    IonLabel,
    IonImg,
  ],
})
export class ViewImagePage implements OnInit {
  public image!: Image;
  private data = inject(ImageDataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {
    addIcons({ personCircle });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.image = this.data.getImagesByFilepaths([id])[0];
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Gallery' : '';
  }
}
