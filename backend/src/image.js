const fs = require("fs").promises;
const path = require("path");

const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];

async function getImages(directory) {
    try {
        const files = await fs.readdir(directory);

        const imageFiles = files.filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        return imageFiles;
    } catch (error) {
        console.error("Error reading directory:", error);
        throw error;
    }
}

module.exports = { getImages };
