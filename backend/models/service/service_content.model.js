const mongoose = require("mongoose");

const serviceContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },

});

const ServiceContent = mongoose.model("ServiceContent", serviceContentSchema);

module.exports = ServiceContent;
