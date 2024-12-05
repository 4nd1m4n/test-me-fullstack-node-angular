import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
const apiEndpoint = 'images/';
const imagesEndpoint = baseUrl + apiEndpoint;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getImageFilenames() {
    return this.http.get(imagesEndpoint + 'paths');
  }

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
}
