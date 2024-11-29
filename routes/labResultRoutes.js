const express = require("express");
const auth = require("../middleware/auth");
const { addLabResults, getLabResults } = require("../controllers/labResultsController");

const labResultRouter = express.Router();


labResultRouter.post(
  "/add",
  auth,
  addLabResults
);


labResultRouter.get("/get/:appointmentId", auth, getLabResults);
module.exports = labResultRouter;
