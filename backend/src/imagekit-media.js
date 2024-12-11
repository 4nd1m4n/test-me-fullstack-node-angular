const ImageKit = require("imagekit");

const _imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

async function listImageMetadata(
    gallery,
    skip = 0,
    limit = 10,
    imagekit = _imagekit
) {
    const list = await imagekit.listFiles({
        fileType: "image",
        path: gallery,
        skip: skip,
        limit: limit,
    });

    return list;
}

async function listPneumoniaMetadata(
    skip = 0,
    limit = 10,
    imagekit = _imagekit
) {
    const pneumonia_gallery_path = "/lung-x-rays/PNEUMONIA";
    return listImageMetadata(pneumonia_gallery_path, skip, limit, imagekit);
}

module.exports = { listPneumoniaMetadata };
