const mongoose = require("mongoose");

const schema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true,
                        trim: true,
                        min: 3,
                        max: 20,
                },
                images: {
                        type: [String],
                        required: true
                },
                videos: {
                        type: [String],
                },
                documents: {
                        type: [String]
                },
                description: {
                        type: String
                }
        },
        {
                timestamps: true,
        }
);


module.exports.Folder = mongoose.model("Folder", schema);