'use strict';


const errors = require('../../domain/utils/errors');

module.exports=class {


    constructor(zoneRepository,zoneEntity,cryptoHandler) {

        this.zoneRepository=zoneRepository;
        this.zoneEntity=zoneEntity;
        this.cryptoHandler=cryptoHandler;
        this.create=this.create.bind(this);
        this.getAreas=this.getAreas.bind(this);
        this.delete=this.delete.bind(this);

    }
    async  create(
        name,
        geographicalHierarchy,
        isActive,
        coordinates,
        center,
        dbName
    ){

        coordinates={type:'Polygon',coordinates:coordinates}
        center={type:'Point',coordinates:center}
        let checkIntersection = await this.zoneRepository.checkIntersection(coordinates,dbName)
        if(checkIntersection.length){
            throw new errors.zoneIntersection()
        }
        let validZone=await this.zoneEntity.setZone({
            id:this.cryptoHandler.uuidGenerator(),
            name,
            center,
            isActive,
            geographicalHierarchy,
            location:coordinates
        })
        await this.zoneRepository.create(validZone,dbName)

        return true;

    }
    async  getAreas(dbName){

        const areas = await this.zoneRepository.getAreas(dbName)
        return areas;

    }
    async  delete(id,dbName){

        await this.zoneRepository.delete(id,dbName)
        return true;

    }




}
