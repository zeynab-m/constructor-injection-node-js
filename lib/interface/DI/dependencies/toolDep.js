const {picToolSymbol}= require('../../../infrastructure/config/constant').TOOL
const {picTool}= require('../../../infrastructure/tools/pic')

module.exports=(diContainer)=> {

    diContainer.constructor(picToolSymbol, {dependency:[],conn:picTool});
}



