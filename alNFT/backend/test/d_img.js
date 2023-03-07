const downloadImage = async () => {
    const fetch = await import('node-fetch').then((mod) => mod.default);
    const fs = require('fs');

    const imageUrl = "";
    const imageName = "im.png"

    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    try {
        fs.writeFile(imageName, Buffer.from(buffer), () => {
            console.log(`Image downloaded at ${imageName}`);
            // Return a success response to the frontend
        }); 
    } catch (error) {
        console.error(error);
        // Return an error response to the frontend
    }
};

downloadImage();