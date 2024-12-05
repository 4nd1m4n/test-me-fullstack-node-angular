const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const assets = path.join(__dirname, "..", "assets");
console.log(assets);

app.get("/", (req, res) => {
    res.send("Node backend running.");
});

// NOTE: this would have become the endpoint to the frontend that would have been used to get a list of the images that are
// stored in the assets/images directory.
// But i had to go an easier route to finish in time so i chose not to write my own api service in the frontend just jet
// but rather hard coded everything, like it was done in the framework example.
app.get("/images/paths", (request, response) => {
    response.json(["img1.png", "img2.jpg"]);
});

app.use("/images", express.static(path.join(assets, "images")));

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
