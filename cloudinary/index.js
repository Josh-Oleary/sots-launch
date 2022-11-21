const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'ddfdmqleo',
    api_key: 594265469115286,
    api_secret: 'xeVWIPubJ0uL2Xd2UBoVvBnSOXY'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: 'video',
        folder: 'SOTS-Reports',
        chunk_size: 6000000, 
        format: 'MOV'
        // allowedFormats: ['mp4', 'MOV'],
    }
});

module.exports = { cloudinary, storage }