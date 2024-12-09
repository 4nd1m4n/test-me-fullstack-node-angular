# Task
> Baue mit Node.JS ein kleines Backend,
> welches Bilder von einem Order ausliefern kann und
> im Frontend sollen diese mit Ionic/Angular angezeigt werden.

Translates roughly to:
- Build small node.js backend,
- that serves a folder and
- displays it's image file contents in an ionic/angular image gallery frontend.


# Install
- Go to `backend/src` then execute `npm install`
- Go to `frontend/gallery` then execute `npm install`
  - `npm install -g @ionic/cli`


# Run backend
- Run `node backend/src/server.js`
- Or run `npm start` in development


# Run frontend
- Go to: `cd ./frontend/gallery`
- Run `ionic serve` within the app directory to see your app in the browser


# TODO

- [ ] jsdelivr - to retrieve images from cdn
  - [ ] must return json to frontend
  - [ ] should create "database/cache" of directory at server startup
    - [ ] via this it should also allow to add new images just copy and let the startup routine cache the new files

https://ik.imagekit.io/wozo7gejv/abstract-1_h6LtzOTZB?updatedAt=1733754671058



// Arbeitsbeginn: 8:40

# INFOS

- USE CDN: https://imagekit.io
- username: info@onexip.com
- password: ***

Normales Bild abrufen:
https://ik.imagekit.io/wozo7gejv/iStock-1382384512.jpg

Bild in bestimmten Größe abrufen:
https://ik.imagekit.io/wozo7gejv/tr:w-300,h-300/iStock-1382384512.jpg


CDN mit ngOptimizedImage nutzen: https://medium.com/@pavel.salauyou/configuring-imagekit-io-loader-for-ngoptimizedimage-and-manipulate-images-on-the-fly-in-angular-a0e073ab9c69

