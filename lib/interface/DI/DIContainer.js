module.exports=function () {

    let dependencies={}
    let constructors={}
    let diContainer={}


    diContainer.constructor=function (name, constructor) {
        constructors[name]= constructor

    }
    diContainer.register=function (name,dependency) {

        dependencies[name]=dependency

    }
    diContainer.get=function (name) {

        if(!dependencies[name]){
            var constructor=constructors[name]
            dependencies[name]=constructor && diContainer.inject(constructor)

            if (!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        // console.log({dependencies})

        return dependencies[name]


    }
    diContainer.inject=function (constructor) {
        let arg= constructor.dependency.map(function (dependency) {
            return diContainer.get(dependency)
        })
        return arg.length? new constructor.conn(arg[0],arg[1],arg[2]):new constructor.conn()

    }
     return diContainer



    
}
