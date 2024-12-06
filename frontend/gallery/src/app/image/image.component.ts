import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Platform,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { Image } from '../services/data.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, IonItem, IonLabel, IonThumbnail],
})
export class ImageComponent {
  private platform = inject(Platform);
  @Input() image?: Image;
  isIos() {
    return this.platform.is('ios');
  }
  constructor() {
    addIcons({ chevronForward });
  }
}
