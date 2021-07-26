const diContainer= require('./DIContainer')()
const repositories = require('./dependencies/repositoryDep')
const services = require('./dependencies/serviceDep')
const entities = require('./dependencies/entityDep')
const controllers = require('./dependencies/controllerDep')
const utils = require('./dependencies/utilDep')
const tools = require('./dependencies/toolDep')

repositories(diContainer)
services(diContainer)
entities(diContainer)
controllers(diContainer)
utils(diContainer)
tools(diContainer)

module.exports=diContainer