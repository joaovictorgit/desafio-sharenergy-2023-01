const expressRouter = require("express");

const router = expressRouter.Router();
const RouterUser = require("./user-routes");
const RouterClient = require("./client-routes");

router.use("/users", RouterUser);
router.use("/clients", RouterClient);

module.exports = router;
