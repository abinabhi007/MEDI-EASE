const Laboratories = require("../models/laboratoryModel.js");
const User = require("../models/userModel.js");
const getalllaboratories = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Laboratories.find().populate("userId");
    } else {
      docs = await Laboratories.find()
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

const accept = async (req, res) => {
  try {
    const result = await Laboratories.findByIdAndUpdate(
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
    const result = await Laboratories.findByIdAndUpdate(
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
const getApprovedLaboratories = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Laboratories.find().populate("userId");
    } else {
      docs = await Laboratories.find()
        .find({
          _id: { $ne: req.locals },
          status: "approved"
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get laboratories");
  }
};

module.exports = {
  getalllaboratories,
  accept,
  reject,
  getApprovedLaboratories
};
