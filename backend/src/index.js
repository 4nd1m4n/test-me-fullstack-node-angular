const path = require("path");

// make .env and imagekit configuration available
require("dotenv").config({
    // .env is all the way up in the root, because both projects need the keys
    path: path.join(__dirname, "../../.env"),
});

// run server
require("./server");
