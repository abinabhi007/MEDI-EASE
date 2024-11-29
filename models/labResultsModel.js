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
    labId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Laboratories",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Labresults = mongoose.model("Labresults", schema);

module.exports = Labresults;
