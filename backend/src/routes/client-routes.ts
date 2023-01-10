const expressClientRouter = require("express");
const routerClient = expressClientRouter.Router();

import authentication from "../middlewares/authenticate";
import clientController from "../controllers/client-controller";

routerClient.post("/", authentication, clientController.createClient);
routerClient.get("/", authentication, clientController.showAllClients);
routerClient.get("/:name", authentication, clientController.showClientByName);
routerClient.patch("/:id", authentication, clientController.updateById);
routerClient.delete("/:id", authentication, clientController.deleteById);

module.exports = routerClient;
