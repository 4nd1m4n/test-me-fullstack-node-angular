import { Injectable } from '@angular/core';

export interface Image {
  id: number;
  filepath: string;
  description: string;
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
  public images: Image[] = [
    {
      id: 0,
      filepath: new URL('cat.jpg', imagesEndpoint).href,
      description: 'Cute cat.',
    },
    {
      id: 1,
      filepath: new URL('elefants.jpg', imagesEndpoint).href,
      description: 'Two elephants.',
    },
    {
      id: 2,
      filepath: new URL('sheep.jpg', imagesEndpoint).href,
      description: 'Multiple sheep.',
    },
    {
      id: 3,
      filepath: new URL('squirrel.jpg', imagesEndpoint).href,
      description: 'Secret service squirrel.',
    },
    {
      id: 4,
      filepath: new URL('tiger.jpg', imagesEndpoint).href,
      description: 'Probably hungry tiger.',
    },
  ];

  constructor() {}

  public getImages(): Image[] {
    return this.images;
  }

  public getImageById(id: number): Image {
    return this.images[id];
  }
}
