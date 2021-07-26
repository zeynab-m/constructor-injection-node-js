'use strict';

module.exports=class {

    constructor(pointService) {

        this.pointService=pointService
        this.homeIndex=this.homeIndex.bind(this)


    }


    async homeIndex(req, res, next){
        try {

            const points= await this.pointService.getPoints(req.dbName)
            res.render('home',{points});

        } catch (e) {

            next(e)

        }


    }






}

