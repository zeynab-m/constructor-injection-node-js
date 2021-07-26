'use strict';


const errors = require('../../domain/utils/errors');

module.exports=class {


    constructor(picRepository,picTool) {

        this.picTool=picTool;
        this.picRepository=picRepository;
        this.create=this.create.bind(this);


    }
    async  create(
        files,
        dbName
    ){

        let thumbnailDirectory=`public/location/pic/thumbnail`
        let originalDirectory=`public/location/pic`
        let incomingPics=[]

        for (let file of files){

            let thumbName=`thumb${file.filename}`
            let thumbnail= await this.picTool.generateThumbnail(file.path, thumbnailDirectory,thumbName)
            incomingPics.push({
                name:file.filename,
                thumbnail:`${thumbnailDirectory}/${thumbName}`,
                original:`${originalDirectory}/${file.filename}`
            })

        }
       let{invalidInput, pics}= await this.picRepository.bulkInsert(incomingPics,dbName)


        return {invalidInput, pics};

    }





}
