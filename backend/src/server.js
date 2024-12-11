const express = require("express");
const cors = require("cors");

const imagekit = require("./imagekit-media");

const port = 3000;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Node backend running.");
});

app.get("/imagepaths", async (request, response) => {
    start = request.query["start"];
    count = request.query["count"];

    const metadataList = await imagekit.listPneumoniaMetadata(start, count);

    const imageFilepaths = metadataList.map(
        (fileMetadata) => fileMetadata.filePath
    );

    response.send(imageFilepaths);
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
