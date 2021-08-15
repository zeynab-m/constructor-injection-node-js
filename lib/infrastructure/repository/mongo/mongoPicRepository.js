'use strict';
const picRepository = require('../../../application/domain/pic/picRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {serializer,validator,picCollection}= require('../../orm/mongo/migrations')

module.exports = class extends picRepository {

    constructor(picEntity) {
        super()
        this.picEntity=picEntity
        this.collection='pics'
        this.bulkInsert=this.bulkInsert.bind(this)

    }

    async bulkInsert(incomingPics,dbName) {


        let {validInput}=await this.bulkInsertGenerator(incomingPics)
        let picSchema =await mongo().collection(dbName,this.collection)
        return validInput.length?await picSchema.insert(validInput):[]



    }
    async bulkInsertGenerator(incomingPics) {
        let validInput=[]

        for(let pic of incomingPics){

                let validated=await validator(
                    {
                        id:pic.id,
                        name:pic.name,
                        thumbnail:pic.thumbnail,
                        original:pic.original,
                        deletedAt:pic.deletedAt,//in case of soft delete
                        createdAt:pic.createdAt,
                        updatedAt:pic.updatedAt,

                    },picCollection)
                validInput.push(validated)


        }
        return({validInput})
    }



}
