const Doctor = require("../models/doctorModel");
const Pharmacies = require("../models/pharmacyModel");
const User = require("../models/userModel");

const getallpharmacies = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Pharmacies.find().populate("userId");
    } else {
      docs = await Pharmacies.find()
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get pharmacies");
  }
};


const getApprovedPharmacies = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Pharmacies.find().populate("userId");
    } else {
      docs = await Pharmacies.find()
        .find({
          _id: { $ne: req.locals },
          status: "approved"
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get pharmacies");
  }
};


const accept = async (req, res) => {
  try {
    const result = await Pharmacies.findByIdAndUpdate(
      { _id: req.params.id },
      { status: 'approved' }
    );
    const userResult = await User.findByIdAndUpdate(
      { _id: result.userId },
      { status: 'approved' }
    );
    if (!result || !userResult) {
      return res.status(500).send("Unable to approve user");
    }
    return res.status(201).send("User approved successfully");
  } catch (error) {
    res.status(500).send("Unable to approve user");
  }
};

const reject = async (req, res) => {
  try {
    const result = await Pharmacies.findByIdAndUpdate(
      { _id: req.params.id },
      { status: 'rejected' }
    );
    const userResult = await User.findByIdAndUpdate(
      { _id: result.userId },
      { status: 'rejected' }
    );
    if (!result || !userResult) {
      return res.status(500).send("Unable to reject user");
    }
    return res.status(201).send("User rejected successfully");
  } catch (error) {
    res.status(500).send("Unable to reject user");
  }
};


module.exports = {
  getallpharmacies,
  accept,
  reject,
  getApprovedPharmacies
};
