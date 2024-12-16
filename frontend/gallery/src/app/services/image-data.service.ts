import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import ImageKit from 'imagekit-javascript';

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
  constructor(private http: HttpClient) {}

  private filepathsToImages(filepaths: string[]) {
    // let imagekit = new ImageKit({
    //   urlEndpoint: 'https://ik.imagekit.io/wozo7gejv/',
    // });
    let imagekit = new ImageKit({
      urlEndpoint: 'https://ik.imagekit.io/wozo7gejv/',
    });

    const images = filepaths.map((filepath, index) => {
      return {
        id: index,
        // filepath: joinURL(imagesEndpointCDN, CDN_ID, filepath),
        filepath: filepath,
        // filepath: imagekit.url({
        //   path: filepath,
        //   transformation: [
        //     {
        //       height: '100',
        //       width: '100',
        //       format: 'webp',
        //       cm: 'extract',
        //     },
        //   ],
        // }),
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
