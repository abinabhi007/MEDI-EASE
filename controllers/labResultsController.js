const Labresults = require("../models/labResultsModel");

const addLabResults = async (req, res) => {
  const { file, appointmentId, labId } = req.body;
  try {
    const labResults = Labresults({
      file,
      appointmentId: appointmentId,
      labId
    });

    const result = await labResults.save();
    if (result) {
      return res.status(201).send("Lab results uploaded successfully");
    } else {
      return res.status(500).send("Unable to upload");
    }
  } catch (error) {
    res.status(500).send("Unable to upload");
  }
};

const getLabResults = async (req, res) => {
  const { appointmentId } = req.params;
  console.log(req.body);
  try {
    const labresults = await Labresults.find({
      appointmentId: appointmentId,
    });
    if (labresults) {
      console.log(labresults);

      return res.send(labresults);
    } else {
      return res.status(500).send("Unable to fetch lab results");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to fetch lab results");
  }
};

module.exports = {
  addLabResults,
  getLabResults
};
