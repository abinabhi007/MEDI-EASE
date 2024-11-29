const express = require("express");
const laboratoryController = require("../controllers/laboratoryController");
const auth = require("../middleware/auth");

const laboratoryRouter = express.Router();

laboratoryRouter.get("/getalllaboratories", auth, laboratoryController.getalllaboratories);


laboratoryRouter.get("/getapprovedlaboratories", auth, laboratoryController.getApprovedLaboratories);
laboratoryRouter.put("/accept/:id", auth, laboratoryController.accept);

laboratoryRouter.put("/reject/:id", auth, laboratoryController.reject);

module.exports = laboratoryRouter;
