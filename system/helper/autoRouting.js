const Express = require("../node_modules/express");
// const Express = require("./system/node_modules/express");
const Router = Express.Router();
const fs = require('fs');

const files = fs.readdirSync('../../controllers');

let modules = [];
class autoRouting{
    createRoutes(request, response, next){
        // let method = request.method;
        for(let i = 0; i < files.length; i++){
            let file = files[i].split('.');
            if(file[1] == 'js'){
                modules[file[0]] = require('../controllers/' + files[i]);
            }
        }
    }
}

let routing = new autoRouting;
routing.createRoutes();
// module.exports = modules;
