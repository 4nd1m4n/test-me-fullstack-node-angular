import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagekitService } from 'imagekitio-angular';

export interface Image {
  id: number;
  filename: string;
  filepath: string;
}

// NOTE: Unfortunately i did not have enough time to write an api service.
// But i chose these constant names to demonstrate a few things:
// - The api would have to read a configuration or environment variable that provides the backend base url.
// - The endpoint for images would define it's "endpoint-string"/sub-path 'images/'.
// - Then they plus the image name would be joined together via an url spec aware joiner.
// Then this url could be used to retrieve the image from the backend server.

// NOTE: Furthermore in the future one would want to implement some kind of pagination or batch image retrieval with a
// maximum number of pictures per call.

const baseUrl = 'http://localhost:3000/';
const apiEndpoint = 'imagepaths/';
const imagesEndpoint = baseUrl + apiEndpoint;

@Injectable({
  providedIn: 'root',
})
export class ImageDataService {
  constructor(private http: HttpClient) {}

  //TODO
  // public getFilenames() {
  //   const filenames: string[] = [];

  //   return filenames;
  // }

  // public getImageFilenames() {
  //   return this.http.get(imagesEndpoint + 'paths');
  // }

  public getImagesByFilenames(filenames: string[]): Image[] {
    const images = filenames.map((value, index) => {
      return {
        id: index,
        filename: value,
        filepath: new URL(value, imagesEndpoint).href,
      };
    });

    return images;
  }

  public getImageFilenames() {
    // return this.http.get(imagesEndpoint + 'paths');
    const filenames = this.http.get(imagesEndpoint);

    // console.log(filenames);
    return filenames;

    // // Initializing the service with configuration
    // this.imagekitService = new ImagekitService({
    //   urlEndpoint: 'https://ik.imagekit.io/wozo7gejv/',
    //   publicKey: 'public_w+424hnM+05PtmSrnTR54AnXtCQ=',
    // });

    // // Generating URL
    // // Note: You can choose to override the publicKey if necessary
    // const url = this.imagekitService.ikInstance.url({
    //   path: '/abstract-1_h6LtzOTZB.jpg',
    //   urlEndpoint: 'https://ik.imagekit.io/wozo7gejv/',
    //   // publicKey: 'public_w+424hnM+05PtmSrnTR54AnXtCQ=',
    // });
  }
}
