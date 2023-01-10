const expressUserRouter = require("express");
const routerUser = expressUserRouter.Router();

import userController from "../controllers/user-controller";

routerUser.post("/", userController.createUser);
routerUser.post("/login", userController.loginUser);

module.exports = routerUser;
