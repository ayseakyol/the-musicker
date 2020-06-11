const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.getAll);

router.post("/view", controllers.getOne);

router.post("/", controllers.create);

router.post("/change", controllers.update);

router.post("/delete", controllers.delete);

module.exports = router;
