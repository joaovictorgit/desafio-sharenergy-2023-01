const expressClientRouter = require("express");
const routerClient = expressClientRouter.Router();

import clientController from "../controllers/client-controller";

routerClient.post("/", clientController.createClient);
routerClient.get("/", clientController.showAllClients);
routerClient.get("/:name", clientController.showClientByName);
routerClient.patch("/:id", clientController.updateById);
routerClient.delete("/:id", clientController.deleteById);

module.exports = routerClient;
