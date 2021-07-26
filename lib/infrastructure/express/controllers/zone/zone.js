'use strict';

module.exports=class {

    constructor(zoneService) {

        this.zoneService=zoneService
        this.createIndex=this.createIndex.bind(this)
        this.create=this.create.bind(this)
        this.list=this.list.bind(this)
        this.delete=this.delete.bind(this)

    }


    async createIndex(req, res, next){
        try {

            const zones= await this.zoneService.getAreas(req.dbName)
            res.render('zone/create-zone',{zones});

        } catch (e) {

            next(e)

        }


    }
    async create(req, res, next){

        try {

            const result = await this.zoneService.create(
                req.body.name,
                req.body.geographicalHierarchy,
                req.body.isActive,
                JSON.parse(req.body.location),
                JSON.parse(req.body.center),
                req.dbName

            )

            res.redirect(req.get('referer'))
        } catch (err) {
            next(err);
        }


    }
    async list(req, res, next){
        try {

            const zones= await this.zoneService.getAreas(req.dbName)
            res.render('zone/zones-list',{zones});

        } catch (e) {

            next(e)

        }


    }
    async delete(req, res, next){
        try {

            await this.zoneService.delete(req.params.id,req.dbName)
            res.redirect(req.get('referer'))

        } catch (e) {

            next(e)

        }


    }





}

