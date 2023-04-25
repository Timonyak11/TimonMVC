const Express = require("./system/node_modules/express");
const configs = require('./config/appsConfig');
const bodyParser = require('./system/node_modules/body-parser');
const profiler = require('./system/helper/profiler');
const routes = require('./routes');
const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(Express.static(__dirname + "/assets"));
app.use(configs.session);
console.log(configs.profiler.status);
if(configs.profiler.status == true){
    app.use(profiler);
}

app.use(routes);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(configs.port);