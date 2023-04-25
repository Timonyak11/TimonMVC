const Express = require("../system/node_modules/express");
const session = require('../system/node_modules/express-session');
const app = Express();

const portConfig = {
    port: 8000
}

const sessionConfig = app.use(session({
	secret: 'keyboard',
	resave: false,
	saveUninitialized: true
}));

const enableProfiler = {
	status: true
}



module.exports = {port: portConfig, session: sessionConfig, profiler: enableProfiler};
