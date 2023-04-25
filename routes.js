const Express = require("./system/node_modules/express");
const controller = require("./system/controllers");
const Router = Express.Router();

Router.get("/", controller.Users.index);
Router.post("/login", controller.Users.loginProcess);
Router.post("/register", controller.Users.registerProcess);
Router.get("/profile", controller.Users.profile);
Router.get("/logoff", controller.Users.logoff);

module.exports = Router;