'use strict';

module.exports=class {

    constructor(pointService,picService) {

        this.pointService=pointService
        this.picService=picService
        this.createIndex=this.createIndex.bind(this)
        this.create=this.create.bind(this)


    }


    async createIndex(req, res, next){
        try {

            const points= await this.pointService.getPoints(req.dbName)
            res.render('point/create',{points});

        } catch (e) {

            next(e)

        }


    }
    async create(req, res, next){

        try {


            const pics= await this.picService.create(req.files,req.dbName)
            const point = await this.pointService.create(
                req.body.name,
                req.body.about,
                req.body.visitedAt,
                JSON.parse(req.body.location),
                req.dbName,
                {
                    address:req.body.address,
                    phone:req.body.phone,
                    website:req.body.website,
                    pics,
                }

            )

            res.json({...req.json,
                data:{
                    point:[point],
                }
            });
        } catch (err) {
            console.log({err})
            next(err);
        }


    }






}

