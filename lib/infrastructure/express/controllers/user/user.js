'use strict';

module.exports=class {

    constructor(userService) {

        this.userService=userService
        this.register=this.register.bind(this)
        this.login=this.login.bind(this)

    }


    async register(req, res, next){
        try {
            let x= await this.userService.register(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName:req.body.userName,
                    password:req.body.password,
                    repeatedPassword:req.body.repeatedPassword,
                    roles:req.body.roles,
                },
                req.dbName
            )
            res.json({});

        } catch (e) {

            next(e)

        }


    }
    async loginIndex(req, res, next){

        try {
            if (req.session && req.session.user) {
                res.redirect('/backOffice/v1/home');
                return;
            }
            res.render('auth/login');
        } catch (err) {
            next(err);
        }


    }
    async logout(req, res, next){

        try {
            if (req.session) {
                req.session.user = null;
            }
            res.redirect('/backOffice/v1/user/login')
        } catch (err) {
            next(err);
        }

    }
    async login(req, res, next){

        try {

            const user = await this.userService.login(
                req.body.userName,
                req.body.password,
                req.dbName
            );

            if (req.session) {
                req.session.user = {...user, password: null};
            }
            res.redirect('/backOffice/v1/home')
        } catch (err) {
            console.log({err})
            next(err);
        }
    }




}


