const express = require("express");
const path = require("path");
const app = express();
const image = require("./image");

const port = 3000;

const assets = path.join(__dirname, "..", "assets");
const images = path.join(assets, "images");
console.log(images);

app.get("/", (req, res) => {
    res.send("Node backend running.");
});

// NOTE: this would have become the endpoint to the frontend that would have been used to get a list of the images that are
// stored in the assets/images directory.
// But i had to go an easier route to finish in time so i chose not to write my own api service in the frontend just jet
// but rather hard coded everything, like it was done in the framework example.
app.get("/images/paths", async (request, response) => {
    imagesFilepaths = await image.getImages(images);

    response.json(imagesFilepaths);
});

app.use("/images", express.static(images));

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
