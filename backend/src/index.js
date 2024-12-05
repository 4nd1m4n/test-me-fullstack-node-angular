const express = require("express");
const cors = require("cors");
const path = require("path");

const image = require("./image");

const app = express();
app.use(cors());

const port = 3000;

const assets = path.join(__dirname, "..", "assets");
const images = path.join(assets, "images");

app.get("/", (req, res) => {
    res.send("Node backend running.");
});

app.get("/images/paths", async (request, response) => {
    imagesFilepaths = await image.getImages(images);

    response.json(imagesFilepaths);
});

app.use("/images", express.static(images));

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
