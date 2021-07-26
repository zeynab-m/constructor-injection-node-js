'use strict';


const errors = require('../../domain/utils/errors');

module.exports=class {


    constructor(pointRepository) {

        this.pointRepository=pointRepository;
        this.create=this.create.bind(this);
        this.getPoints=this.getPoints.bind(this);
        // this.getAreas=this.getAreas.bind(this);
        // this.delete=this.delete.bind(this);

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
        let point=await this.pointRepository.create({
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
        },dbName)
        point = await this.pointRepository.read(point,dbName)
        console.log({point})
        return point;

    }
    async  getPoints(dbName){

        const points = await this.pointRepository.getPoints(dbName)
        return points;

    }





}
