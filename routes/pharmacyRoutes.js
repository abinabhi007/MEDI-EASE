const express = require("express");
const pharmacyController = require("../controllers/pharmacyController");
const auth = require("../middleware/auth");

const pharmacyRouter = express.Router();

pharmacyRouter.get("/getallpharmacies", auth, pharmacyController.getallpharmacies);
pharmacyRouter.get("/getapprovedpharmacies", auth, pharmacyController.getApprovedPharmacies);


pharmacyRouter.put("/accept/:id", auth, pharmacyController.accept);

pharmacyRouter.put("/reject/:id", auth, pharmacyController.reject);

module.exports = pharmacyRouter;
