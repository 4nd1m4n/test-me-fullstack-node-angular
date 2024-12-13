import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Platform, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { Image } from '../services/image-data.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonItem,
    NgOptimizedImage,
    // RouterLink,
  ],
})
export class ImageComponent {
  private platform = inject(Platform);
  // public placeholderUrl = '/assets/image-placeholder.png';

  public placeholder: string =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIeSURBVFiFzde9axRBGIDx311slAQ0iMTiREP8wEJBC7FT8aML+A8IASFgY2WVIqUfRQorS1tRURQEEYOdlYoiKTRFTEBE4gkGv03GYt+Qje553OUu58Awt/POzPOwN+/srpQS9OEqppHaXKeD1ZdSUgr4c2zCAma0t1RQxnvsFTYJt9GfUtLOiv5gpWCbxvy/4Cihq8US88GWMFVj4B48wCd8wWMcbZHEVLCLBXAc3yP+NSSSbJ8Mt1UAPXgbsVFsRDeG8QOfsbWdAiei/1nBxOsRO9MKgXKNVBmI9m5B7F60u2rMbajUEngV7cmC2GC0E60QoPgv6JYdSAnnsRnrcRY/MYdKu7PgsCz1kmzjLf6ex1CdxdeG7BNcwZaGBWLQdtzAO3zEfRysA1+HhznZhFlsa1igiduahz+VPV8ux/ULdLdNoADeG/1dstM04SZKLReoBc/FezEZ8dGWCtSD58btlh3nC7L0rpsFvRjBI5xDT7Pw3PjBEJiz9GwpPAd24LXlbzITGGgWnps38se6ywVwCNXov4V9uBPXVRxrFp5jXCsUwJDs0Em4hHL0l3Ex+n/hZbPw3N2bzQu8wQVLp97pGhNP4dtK4Lm1lm3CxVrFkToT94fIhhWm7l8Ck9i5kkWbEVgjK1UcSCl9sMpl8X1grhPwvEDHyn8hMINKqVTqXy1osCqYKWM8RMZWQyIYY8Ec7/zHaeRkxz7PfwNBh3daeExvIgAAAABJRU5ErkJggg==';

  @Input() image?: Image;
  isIos() {
    return this.platform.is('ios');
  }
  constructor() {
    addIcons({ chevronForward });
  }
}
