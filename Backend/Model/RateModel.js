const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RateSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rates: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Rate", RateSchema);
