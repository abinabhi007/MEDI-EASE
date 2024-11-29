const Prescriptions = require("../models/prescriptionModel");

const addPrescription = async (req, res) => {
  const { file, appointmentId } = req.body;
  console.log(req.body);
  try {
    const prescription = Prescriptions({
      file,
      appointmentId: appointmentId,
    });

    const result = await prescription.save();
    console.log(result);
    if (result) {
      return res.status(201).send("Prescription uploaded successfully");
    } else {
      return res.status(500).send("Unable to upload");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to upload");
  }
};
const getPrescriptions = async (req, res) => {
  const { appointmentId } = req.params;
  console.log(req.body);
  try {
    const prescriptions = await Prescriptions.find({
      appointmentId: appointmentId,
    }).populate('appointmentId');
    if (prescriptions) {
      console.log(prescriptions);

      return res.send(prescriptions);
    } else {
      return res.status(500).send("Unable to fetch prescriptions");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to fetch prescriptions");
  }
};
const updatePrescription = async (req, res) => {
  const { id } = req.params;
  const { pharmId, labId } = req.body;
  console.log(req.body);
  try {
    const result = await Prescriptions.findByIdAndUpdate(id, {
      ...pharmId && { pharmId: pharmId },
      ...labId && { labId: labId },
    });
    if (result) {
      return res.status(200).send(`Prescription sent to ${pharmId ? 'Pharmacy' : 'Laboratory'}`);
    } else {
      return res.status(500).send("Unable to send prescription");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to send prescription");
  }
};
const getallprescriptions = async (req, res) => {
    try {
      const keyword = req.query.search
        ? {
            $or: [{ pharmId: req.query.search }, { labId: req.query.search }],
          }
        : {};

        console.log(keyword)
  
      const prescriptions = await Prescriptions.find(keyword).populate("appointmentId");
      return res.send(prescriptions);
    } catch (error) {
      res.status(500).send("Unable to get prescriptions");
    }
  };
module.exports = {
  addPrescription,
  getPrescriptions,
  updatePrescription,
  getallprescriptions
};
