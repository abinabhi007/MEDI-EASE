const express = require("express");
const auth = require("../middleware/auth");
const {
  addPrescription,
  getPrescriptions,
  updatePrescription,
  getallprescriptions,
} = require("../controllers/prescriptionController");

const prescriptionRouter = express.Router();

prescriptionRouter.post("/add", auth, addPrescription);

prescriptionRouter.get("/get/:appointmentId", auth, getPrescriptions);

prescriptionRouter.put("/update/:id", auth, updatePrescription);

prescriptionRouter.get('/getallprescriptions', auth, getallprescriptions)

module.exports = prescriptionRouter;
