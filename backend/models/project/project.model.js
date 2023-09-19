const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		text: String,
	},
	{ timestamps: true }
);

const categorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
});

const projectSchema = new mongoose.Schema(
	{
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProjectCategory",
			required: true,
		},
		numberOfFloors: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		stage: {
			type: String,
			enum: ["DESIGN", "CONSTRUCTION", "COMPLETE"],
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		planPrice: {
			type: Number,

		},
		comments: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Comment",
			default: [],
			
		},
		likes: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		images: {
			type: [String],
			required: true
		},
		documents: {
			type: [String],
			required: true
		},
		video: {
			type: String,
		},
		location: {
			type: String,
		},
		livingRooms: {
			type: Number,
		},
		washRooms: {
			type: Number,
		},
		bedRooms: {
			type: Number,
		},
		commenting: {
			type: Boolean,
		},
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
	},
	{
		timestamps: true,
	}
);

exports.Project = mongoose.model("Project", projectSchema);
exports.Category = mongoose.model("ProjectCategory", categorySchema);
exports.Comment = mongoose.model("Comment", commentSchema);

