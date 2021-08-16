'use strict';


const errors = require('../../domain/utils/errors');

module.exports=class {


    constructor(picRepository,picTool,picEntity,cryptoHandler) {

        this.picTool=picTool;
        this.picEntity=picEntity;
        this.picRepository=picRepository;
        this.cryptoHandler=cryptoHandler;
        this.create=this.create.bind(this);


    }
    async  create(
        files,
        dbName
    ){

        let thumbnailDirectory=`public/location/pic/thumbnail`
        let originalDirectory=`public/location/pic`
        let incomingPics=[]
        let outComePics=[]

        for (let file of files){

            let thumbName=`thumb${file.filename}`
            await this.picTool.generateThumbnail(file.path, thumbnailDirectory,thumbName)
            let pic=await this.picEntity.setPic(
                {
                name:file.filename,
                id:this.cryptoHandler.uuidGenerator(),
                thumbnail:`${thumbnailDirectory}/${thumbName}`,
                original:`${originalDirectory}/${file.filename}`
            })
            incomingPics.push(pic)
            outComePics.push(pic.id)

        }
       await this.picRepository.bulkInsert(incomingPics,dbName)


        return outComePics;

    }





}
