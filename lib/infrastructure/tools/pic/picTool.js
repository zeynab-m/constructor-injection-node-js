var base64 = require('./base64');
var fs = require('fs');
var crypto = require('crypto');
var {join} = require ('path');
var gm = require('gm');

module.exports=class {

    constructor() {

    }
    async uploadPic(imageBody, userUploadedImagePath,directories) {

        try {
            let returnUserAddress = "";
            const ImageEncodedString = imageBody;
            const imageBuffer = base64.decodeBase64Image(ImageEncodedString);

            returnUserAddress = userUploadedImagePath;
            userUploadedImagePath = join(__dirname, '../../', userUploadedImagePath);

            fs.mkdir(directories, { recursive: true }, (err) => {

                if (err) {
                    throw new Error()
                    return};
                fs.writeFile(userUploadedImagePath, imageBuffer.data, function (err) {

                    if (err)

                        new Promise.reject(0, null);

                    else {
                        new Promise.resolve(null, returnUserAddress);
                    }

                });

            });


        } catch (e) {
            throw new Error(e)
        }
    }
    async generateThumbnail(original, thumbnailDirectory,filename) {

        try {
            thumbnailDirectory=join(__dirname, '../../../../',thumbnailDirectory)
            fs.mkdir(thumbnailDirectory, { recursive: true }, (err) => {
                if (err) {
                    throw new Error()
                    return
                };
                gm(original)
                    .resize('250', '180', '^')
                    .gravity('center')
                    .extent(250, 180)
                    .write(`${thumbnailDirectory}/${filename}`, function (error,result) {


                    })

            });
            return  `${thumbnailDirectory}/${filename}`


        } catch (e) {
            throw new Error(e)


        }
    }



}


