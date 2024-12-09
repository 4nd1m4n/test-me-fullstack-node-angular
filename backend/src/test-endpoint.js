import config from `../config.json` assert { type: `json` };

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: config.publicKey,
    privateKey: config.privateKey,
    urlEndpoint: config.urlEndpoint,
});

imagekit
    .listFiles({
        skip: 10,
        limit: 10,
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });

// async function getFilenamesFromLibrary(libraryId) {
//     let allFilenames = [];

//     // Implement pagination if needed
//     const response = await imagekit.getMediaLibrary(libraryId);

//     // Extract filenames from the response
//     response.data.forEach((item) => {
//         allFilenames.push(item.metadata.filename);
//     });

//     return allFilenames;
// }

// // Usage example
// getFilenamesFromLibrary("your_bedrock_library_id")
//     .then((filenames) => console.log(filenames))
//     .catch((error) => console.error("Error:", error));
