import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

export interface Image {
  id: number;
  filepath: string;
}

const baseUrl = 'http://localhost:3000/';
const apiEndpoint = 'imagepaths/';
const imagesEndpointBackend = baseUrl + apiEndpoint;

// endpoint to media thats configured in the ImageKit.io CDN web interface
const imagesEndpointCDN = 'https://ik.imagekit.io/';
const CDN_ID = 'wozo7gejv';

function joinURL(...args: any) {
  return args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');
}

/**
 * Splits an array into chunks of a specified size.
 *
 * @param {Array} array The input array to be chunked.
 * @param {number} chunkSize The size of each chunk.
 * @returns {Array<Array>} An array of chunks.
 */
export function splitArrayIntoChunks(array: any[], chunkSize: number) {
  return array.reduce((accumulator, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!accumulator[chunkIndex]) accumulator[chunkIndex] = [];

    accumulator[chunkIndex].push(item);

    return accumulator;
  }, []);
}

@Injectable({
  providedIn: 'root',
})
export class ImageDataService {
  public placeholder: string =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIeSURBVFiFzde9axRBGIDx311slAQ0iMTiREP8wEJBC7FT8aML+A8IASFgY2WVIqUfRQorS1tRURQEEYOdlYoiKTRFTEBE4gkGv03GYt+Qje553OUu58Awt/POzPOwN+/srpQS9OEqppHaXKeD1ZdSUgr4c2zCAma0t1RQxnvsFTYJt9GfUtLOiv5gpWCbxvy/4Cihq8US88GWMFVj4B48wCd8wWMcbZHEVLCLBXAc3yP+NSSSbJ8Mt1UAPXgbsVFsRDeG8QOfsbWdAiei/1nBxOsRO9MKgXKNVBmI9m5B7F60u2rMbajUEngV7cmC2GC0E60QoPgv6JYdSAnnsRnrcRY/MYdKu7PgsCz1kmzjLf6ex1CdxdeG7BNcwZaGBWLQdtzAO3zEfRysA1+HhznZhFlsa1igiduahz+VPV8ux/ULdLdNoADeG/1dstM04SZKLReoBc/FezEZ8dGWCtSD58btlh3nC7L0rpsFvRjBI5xDT7Pw3PjBEJiz9GwpPAd24LXlbzITGGgWnps38se6ywVwCNXov4V9uBPXVRxrFp5jXCsUwJDs0Em4hHL0l3Ex+n/hZbPw3N2bzQu8wQVLp97pGhNP4dtK4Lm1lm3CxVrFkToT94fIhhWm7l8Ck9i5kkWbEVgjK1UcSCl9sMpl8X1grhPwvEDHyn8hMINKqVTqXy1osCqYKWM8RMZWQyIYY8Ec7/zHaeRkxz7PfwNBh3daeExvIgAAAABJRU5ErkJggg==';

  constructor(private http: HttpClient) {}

  private filepathsToImages(filepaths: string[]) {
    const images = filepaths.map((value, index) => {
      return {
        id: index,
        // filepath: joinURL(imagesEndpointCDN, CDN_ID, value),
        filepath: value,
      };
    });

    return images;
  }

  public getImageFilepaths(start: number, count: number) {
    const responseObservable = this.http.get<string[]>(imagesEndpointBackend, {
      params: { start: start, count: count },
    });

    return responseObservable;
  }

  public getImages(start: number, count: number) {
    const images = this.getImageFilepaths(start, count).pipe(
      map((filepaths: string[]) => this.filepathsToImages(filepaths))
    );

    return images;
  }
}
