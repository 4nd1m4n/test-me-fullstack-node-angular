import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
import {
  debounce,
  debounceTime,
  fromEvent,
  interval,
  map,
  throttleTime,
} from 'rxjs';

//////////////

////////////

const COMPONENT_RX_ANGULAR_CONFIG: RxRenderStrategiesConfig<string> = {
  // NOTE: 'immediate' seemed the best so far
  // [see](https://www.rx-angular.io/docs/cdk/render-strategies#features)
  primaryStrategy: 'immediate',
  patchZone: false,
};

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
        runawayItemsOpposite: 1,
        runawayItems: 1,
        templateCacheSize: 10000,
      },
    },
  ],
})
export class HomePage {
  public images: any;
  public imagesGrid: any;

  public rowSize: number = 100;
  public placeholder: string =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIeSURBVFiFzde9axRBGIDx311slAQ0iMTiREP8wEJBC7FT8aML+A8IASFgY2WVIqUfRQorS1tRURQEEYOdlYoiKTRFTEBE4gkGv03GYt+Qje553OUu58Awt/POzPOwN+/srpQS9OEqppHaXKeD1ZdSUgr4c2zCAma0t1RQxnvsFTYJt9GfUtLOiv5gpWCbxvy/4Cihq8US88GWMFVj4B48wCd8wWMcbZHEVLCLBXAc3yP+NSSSbJ8Mt1UAPXgbsVFsRDeG8QOfsbWdAiei/1nBxOsRO9MKgXKNVBmI9m5B7F60u2rMbajUEngV7cmC2GC0E60QoPgv6JYdSAnnsRnrcRY/MYdKu7PgsCz1kmzjLf6ex1CdxdeG7BNcwZaGBWLQdtzAO3zEfRysA1+HhznZhFlsa1igiduahz+VPV8ux/ULdLdNoADeG/1dstM04SZKLReoBc/FezEZ8dGWCtSD58btlh3nC7L0rpsFvRjBI5xDT7Pw3PjBEJiz9GwpPAd24LXlbzITGGgWnps38se6ywVwCNXov4V9uBPXVRxrFp5jXCsUwJDs0Em4hHL0l3Ex+n/hZbPw3N2bzQu8wQVLp97pGhNP4dtK4Lm1lm3CxVrFkToT94fIhhWm7l8Ck9i5kkWbEVgjK1UcSCl9sMpl8X1grhPwvEDHyn8hMINKqVTqXy1osCqYKWM8RMZWQyIYY8Ec7/zHaeRkxz7PfwNBh3daeExvIgAAAABJRU5ErkJggg==';

  throttle(time = 2000) {
    const el = '#viewportXYZ';
    const event = 'scroll';

    // create a reference to the element
    var element = document.querySelector(el);
    // attach an observer

    console.log(element);

    if (element) {
      var eventObserver = fromEvent(element, event);

      // call the throttleTime method on the observable passing the time,
      // map tru the events an get the value of the input
      // return an observable to be subscribed to
      eventObserver.pipe(
        throttleTime(time),
        map((event: any) => event.target.value)
      );
    }
  }

  ngAfterViewInit() {
    this.throttle(20000);
  }

  constructor(private imageService: ImageDataService) {
    this.imageService.getImages(0, 1000).subscribe((response) => {
      this.images = response;
      this.imagesGrid = splitArrayIntoChunks(this.images, 3);
    });

    ////////////

    // this.throttle(20000);

    // const observable = fromEvent(window, 'scroll');

    // //     const subscriber = observable.pipe(
    // //       throttleTime(300 /* ms */)
    // //       // map(() => 'throttle'),
    // //       // merge(observable.debounceTime(350).map(() => 'debounce')),
    // //       // subscribe(
    // //       //   (x) => {
    // //       //     console.log('Next: event!', x);
    // //       //   },
    // //       //   (err) => {
    // //       //     console.log('Error: %s', err);
    // //       //   },
    // //       //   () => {
    // //       //     console.log('Completed');
    // //       //   }
    // //       // )
    // //   // })
    // // );
    // const subscriber = observable.pipe(throttleTime(30000 /* ms */));

    /////

    // const viewport = document.getElementById('viewportXYZ');
    // if (viewport) {
    //   // fromEvent(viewport, 'scroll')
    //   //   .pipe(
    //   //     debounce(() => interval(500)),
    //   //     map((event: any) => event.target.value)
    //   //   )
    //   //   .subscribe((val) => console.log(val));

    //   fromEvent(viewport, 'onScroll')
    //     .pipe(
    //       throttleTime(500),
    //       map((event: any) => event.target.value)
    //     )
    //     .subscribe((val) => console.log(val));
    // }
  }

  // @HostListener('document:wheel', ['$event.target'])
  // public onWheel(targetElement: any) {
  //   console.log('aösdf');
  // }

  // @HostListener('document:wheel', ['$event.target'])
  // public onWheel(targetElement: any) {
  //   debounce(() => interval(500));
  //   console.log()
  // }

  // onScroll(event: any) {
  //   console.log('test');
  // }

  // @HostListener('scroll', ['$event']) // for scroll events of the current element
  // @HostListener('window:scroll', ['$event.target']) // for window scroll events
  // @HostListener('document:scroll', ['$event.target'])
  // onScroll(event: any) {
  //   console.log('lkajsdfkölasdf');
  // }

  // @HostListener('document:wheel', ['$event.target'])
  // onWheel(ev: any) {
  //   setTimeout(() => {
  //     (ev as RefresherCustomEvent).detail.complete();
  //     console.log('akdjsfö');
  //   }, 3000);
  // }

  // observable = fromEvent(window, 'scroll');

  // subscriber = this.observable
  //   .pipe(
  //     throttleTime(300 /* ms */),
  //     map((data) => {
  //       console.log('throttle');
  //       console.log(window.pageYOffset);
  //       return data;
  //     }),
  //     debounceTime(350)
  //   )
  //   .subscribe(
  //     (x) => {
  //       console.log(window.pageYOffset);
  //     },
  //     (err) => {
  //       console.log('Error: %s', err);
  //     },
  //     () => {
  //       console.log('Completed');
  //     }
  //   );

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
}
