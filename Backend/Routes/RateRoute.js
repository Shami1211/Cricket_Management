const express = require("express");
const rate_router = express.Router();
//Insert Model
const Rate = require("../Model/RateModel");


//Insert User Controller
const RateController = require("../Controllers/RateController");

rate_router.get("/", RateController.getAllRate);
rate_router.post("/", RateController.addRate);
rate_router.get("/:id", RateController.getById);
rate_router.put("/:id", RateController.updateRate);
rate_router.delete("/:id", RateController.deleteRate);

//export
module.exports = rate_router;
