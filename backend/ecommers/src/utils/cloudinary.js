const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View Credentials' below to copy your API secret
});

const uploadFiles = async (localpath, foldername) => {
    const uploadResult = await cloudinary.uploader.upload(localpath, {
        folder: foldername
    }).catch((error) => { console.log(error) });

    return uploadResult
}

module.exports = uploadFiles