const mongoose = require("mongoose");
const ServiceContent = require("./service_content.model"); // Import the Service model

const service = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
 
  services: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ServiceContent",
    required: true,
  },
});

const Service = mongoose.model(
  "Service",
  service
);

module.exports = Service;
