'use strict';


const errors = require('../../domain/utils/errors');

module.exports=class {


    constructor(pointRepository,pointEntity,cryptoHandler) {

        this.pointRepository=pointRepository;
        this.pointEntity=pointEntity;
        this.cryptoHandler=cryptoHandler;
        this.create=this.create.bind(this);
        this.getPoints=this.getPoints.bind(this);


    }
    async  create(
        name,
        about,
        visitedAt,
        location,
        dbName,
        {
            address,
            phone,
            website,
            pics
        },
    ){

        location={type:'Point',coordinates:location}
        let pointData= this.pointEntity.setPoint(
            {
            id:this.cryptoHandler.uuidGenerator(),
            name,
            about,
            visitedAt,
            location,
            contact:{
                address,
                phone,
                website,
            },
            pics,
        })
        let point=await this.pointRepository.create(pointData,dbName)
        point = await this.pointRepository.read(point,dbName)
        console.log({point})
        return point;

    }
    async  getPoints(dbName){

        const points = await this.pointRepository.getPoints(dbName)
        return points;

    }





}
