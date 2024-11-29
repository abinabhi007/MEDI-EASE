const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Pharmacies = require("../models/pharmacyModel");
const Laboratories = require("../models/laboratoryModel.js");

const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find()
      .find({ _id: { $ne: req.locals } })
      .select("-password");
    return res.send(users);
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const login = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (!emailPresent) {
      return res.status(400).send("Incorrect credentials");
    }
    console.log(emailPresent);
    const verifyPass = req.body.password === emailPresent.password;

    console.log(verifyPass);
    if (!verifyPass) {
      return res.status(400).send("Incorrect credentials");
    }
    const token = jwt.sign(
      { userId: emailPresent._id, isAdmin: emailPresent.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    return res.status(201).send({ msg: "User logged in successfully", token });
  } catch (error) {
    res.status(500).send("Unable to login user");
  }
};

const register = async (req, res) => {
  const { role } = req.params;
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (emailPresent) {
      return res.status(400).send("Email already exists");
    }
    const hashedPass = req.body.password;
    const user = await User({ ...req.body, password: hashedPass, role });
    const result = await user.save();
    console.log(result);
    if (!result) {
      return res.status(500).send("Unable to register user");
    } else {
      if (role === "doctor") {
        try {
          const alreadyFound = await Doctor.findOne({ userId: result?._id });
          if (alreadyFound) {
            return res.status(400).send("Application already exists");
          }
          console.log(req.body);
          const doctor = Doctor({
            specialization: req.body.specialization,
            city: req.body.city,
            address: req.body.address,
            experience: req.body.experience,
            fees: req.body.fees,
            userId: result?._id,
            status: "pending",
            cert: req.body.cert,
            phone: req.body.phone
          });
          console.log(doctor);
          const doctorResult = await doctor.save();

          if (doctorResult) {
            return res.status(201).send("User registered successfully");
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send("Unable to register user");
        }
      }
      if (role === "pharmacy") {
        try {
          const alreadyFound = await Pharmacies.findOne({
            userId: result?._id,
          });
          if (alreadyFound) {
            return res.status(400).send("Application already exists");
          }

          const Pharmacy = Pharmacies({
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            userId: result?._id,
            status: "pending"
          });
          const PharmacyResult = await Pharmacy.save();

          if (PharmacyResult) {
            return res.status(201).send("Pharmacy registered successfully");
          }
        } catch (error) {
          console.log(error)
          return res.status(500).send("Unable to register user");
        }
      }

      if (role === "laboratory") {
        try {
          const alreadyFound = await Laboratories.findOne({
            userId: result?._id,
          });
          if (alreadyFound) {
            return res.status(400).send("Application already exists");
          }
          const Laboratory = Laboratories({
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            userId: result?._id,
            status: "pending"
          });
          const LaboratoryResult = await Laboratory.save();

          if (LaboratoryResult) {
            return res.status(201).send("Laboratory registered successfully");
          }
        } catch (error) {
          return res.status(500).send("Unable to register user");
        }
      } else {
        return res.status(201).send("Patient registered successfully");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to register user");
  }
};

const updateprofile = async (req, res) => {
  try {
    const hashedPass = req.body.password;
    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      { ...req.body }
    );
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
};

const deleteuser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.body.userId);
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Unable to delete user");
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
};
