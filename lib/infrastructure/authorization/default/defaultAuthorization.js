const {join}= require('path')
const {roleRepository}= require('../../../interface/DI/initiateDependencies')




module.exports.authorization= function (resource){
    return async function (req,res,next){
        if (!req.session && !req.session.user){
            res.render('auth/login')

        }

        let {policies,rolesTitle}= await policy(req.session.user.roles,req.dbName)

        let permitted=false
        rolesTitle.forEach(title=>{
            resource.subject=title
            policies.forEach(policy=>{
                if(resource.subject==policy.subject && resource.object==policy.object && resource.action == policy.action){
                    permitted=true
                    return
                }

            })
        })
        if(permitted){
            next()
        }
        else{
            res.json('Authorization failed')
        }



    }





}
async function policy(roles,dbName){
    let rolesData= await roleRepository.getUserRoles(roles,dbName)
    let policies=[]
    let rolesTitle=[]
    rolesData.forEach(role=>{
        role.permissions.forEach(per=>per.subject=role.title)
        policies.push(...role.permissions)
        rolesTitle.push(role.title)
    })

    return ({policies, rolesTitle})
}