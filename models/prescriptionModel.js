const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Appointments",
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    pharmId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Pharmacies",
      required: false,
    },
    labId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Laboratories",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Prescriptions = mongoose.model("prescriptions", schema);

module.exports = Prescriptions;
