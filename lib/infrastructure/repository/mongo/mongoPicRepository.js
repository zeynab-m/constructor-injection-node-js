'use strict';
const picRepository = require('../../../application/domain/pic/picRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {ObjectId} = require('../../orm/mongo/mongoDriver')()

module.exports = class extends picRepository {

    constructor(picEntity) {
        super()
        this.picEntity=picEntity
        this.collection='pics'
        this.bulkInsert=this.bulkInsert.bind(this)

    }

    async bulkInsert(incomingPics,dbName) {


        let {invalidInput,validInput}=await this.bulkInsertGenerator(incomingPics)
        let picSchema =await mongo().collection(dbName,this.collection)
        let pics=validInput.length?await picSchema.insert(validInput):[]
        pics=pics && pics.insertedIds ?Object.values(pics.insertedIds):[]
        return({invalidInput, pics})



    }
    async bulkInsertGenerator(incomingPics) {
        let invalidInput=[]
        let validInput=[]

        for(let pic of incomingPics){
            try {

                let validated=await this.picEntity.setPic(pic)
                validated._id=ObjectId()
                validInput.push(validated)

            }catch (e){

                invalidInput.push(pic)
            }

        }
        return({validInput, invalidInput})
    }



}
