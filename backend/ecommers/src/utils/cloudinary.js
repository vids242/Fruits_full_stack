const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "dggzpcl2s",
    api_key: "457265955788232",
    api_secret: "5Dp92rWfExuO57FdTwvCuMbxK4w" // Click 'View Credentials' below to copy your API secret
});

const uploadFiles = async (localpath, foldername) => {
    const uploadResult = await cloudinary.uploader.upload(localpath, {
        folder: foldername
    }).catch((error) => { console.log(error) });

    return uploadResult
}

module.exports = uploadFiles