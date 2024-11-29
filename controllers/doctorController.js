const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

const getalldoctors = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Doctor.find().populate("userId");
    } else {
      docs = await Doctor.find()
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get doctors");
  }
};

const getapproveddoctors = async (req, res) => {
  console.log('11here')
  try {
    let docs;
    if (!req.locals) {
      console.log('here')
      docs = await Doctor.find().populate("userId");
    } else {
      console.log('there')
      docs = await Doctor.find()
        .find({
          _id: { $ne: req.locals },
          status: "approved"
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get doctors");
  }
};

const accept = async (req, res) => {
  try {
    const result = await Doctor.findByIdAndUpdate(
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
    const result = await Doctor.findByIdAndUpdate(
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

const getnotdoctors = async (req, res) => {
  try {
    const docs = await Doctor.find({ isDoctor: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non doctors");
  }
};

const applyfordoctor = async (req, res) => {
  try {
    const alreadyFound = await Doctor.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const doctor = Doctor({ ...req.body.formDetails, userId: req.locals });
    const result = await doctor.save();

    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(500).send("Unable to submit application");
  }
};

const acceptdoctor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: true, status: "accepted" }
    );

    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.id },
      { isDoctor: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectdoctor = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: false, status: "rejected" }
    );
    const delDoc = await Doctor.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletedoctor = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      isDoctor: false,
    });
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("Doctor deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to delete doctor");
  }
};

module.exports = {
  getalldoctors,
  getnotdoctors,
  deletedoctor,
  applyfordoctor,
  acceptdoctor,
  rejectdoctor,
  accept,
  reject,
  getapproveddoctors
};
