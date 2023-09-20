const Notification = require("../../models/notification/notification.model");
const { Project, Category } = require("../../models/project/project.model");

const { Folder } = require("../../models/folders/folder.model");
const { User } = require("../../models/user/user.model");
const { uploadFile } = require("../../utils/uploadImage");
const { uploadVideo } = require("../../utils/uploadVideo");
const multer = require("multer");
const cloudinary = require('../../utils/cloudinary');

// #swagger.tags = ['Project']
// #swagger.description = 'Project endpoint to create new Project'
// #swagger.summary = 'Create Project'
exports.createProject = async (req, res) => {
	try {
		const { category } = req.body;
		const categoryExists = await Category.findById(category);
		if (!categoryExists) {
			return res.status(404).json({
				success: false,
				status: 404,
				message: "Category not found",
			});
		}

		let images = []
		for (let i = 0; i < req.body.images.length; i++) {
			const img = await cloudinary.uploader.upload(req.body.images[i], {
				folder: "images",
				resource_type: "auto",
			})
			images.push(img.secure_url)
		}
		let documents = []
		for (let i = 0; i < req.body.documents.length; i++) {
			const doc = await cloudinary.uploader.upload(req.body.documents[i], {
				folder: "documents",
				resource_type: "auto"
			})
			documents.push(doc.secure_url)
		}
		let video;
		if (req.body.video) {
			video = await cloudinary.uploader.upload(req.body.video, {
				folder: "videos",
				resource_type: "auto"
			})
		}


		const newProject = new Project({
			name: req.body.name,
			category: req.body.category,
			numberOfFloors: req.body.numberofFloors,
			planPrice: req.body.planPrice,
			stage: req.body.stage,
			description: req.body.description,
			location: req.body.location,
			uploadedBy: req.body.creator,
			commenting: req.body.commenting,
			livingRooms: req.body.livingRooms ? req.body.livingRooms : null,
			bedRooms: req.body.bedRooms ? req.body.bedRooms : null,
			washRooms: req.body.washRooms ? req.body.washRooms : null,
			images: images,
			video: req.body.video ? video.secure_url : null,
			documents: documents
		});

		// Save Project
		await newProject.save();

		const user = await User.findById(req.body.creator)
		user.projects.push(newProject._id)
		await user.save()

		const moderators = await User.find({ role: "MODERATOR" });
		const admin = await User.findOne({ role: "ADMIN" });
		const currentUserId = req.body.creator;
		const updatedRecipients = moderators.filter((moderator) => moderator._id.toString() !== currentUserId);

		const notification = new Notification({
			action: "created a new project",
			doer: req.body.creator,
			recipients: [admin._id, ...updatedRecipients.map((moderator) => moderator._id),]
		})
		await notification.save()


		const folder = new Folder({
			name: newProject.name,
			images: newProject.images,
			videos: newProject.video,
			documents: newProject.documents,
			description: `This is the folder containing all of the information about  this project ${newProject._id}`
		})
		await folder.save()
		return res.status(201).json({
			success: true,
			status: 201,
			message: "Project created successfully",
			data: newProject,
		});
	} catch (error) {
		console.error("Error creating project:", error);
		return res.status(500).json({
			success: false,
			status: 500,
			message: "Internal server error",
		});
	}
};


// #swagger.tags = ['Project']
// #swagger.description = 'Project endpoint to get all Projects paginated'
// #swagger.summary = 'Get all  Paginated'
exports.getAllProjectsWithPagination = async (req, res) => {
	try {
		const page = parseInt(req.params.page) || 1;
		const perPage = parseInt(req.params.perPage) || 10;
		const count = await Project.countDocuments();
		if (count === 0) {
			res.status(404).json({
				success: false,
				status: 404,
				message: "No Projects found",
			});
			return;
		}

		const totalPages = Math.ceil(count / perPage);
		if (page > totalPages) {
			res.status(400).json({
				success: false,
				status: 400,
				message: `Page ${page} does not exist`,
			});
			return;
		}

		const projects = await Project.find()
			.skip((page - 1) * perPage)
			.limit(perPage)
			.populate("category").populate("user");
		return res.status(200).json({
			success: true,
			status: 200,
			message: "Projects retrieved successfully",
			data: {
				projects,
				currentPage: page,
				totalPages,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};


// #swagger.tags = ['Project']
// #swagger.description = 'Project endpoint to get all Projects'
// #swagger.summary = 'Get all Projects'
exports.getAllProjects = async (req, res) => {
	try {
		const projects = await Project.find().populate("category").populate("uploadedBy");

		return res.status(200).json({
			success: true,
			status: 200,
			message: "Projects retrieved successfully",
			data: {
				projects,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};

// #swagger.tags = ['Project']
// #swagger.description = 'Project endpoint to get a Project'
// #swagger.summary = 'Get Project'
exports.getProject = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id).populate("comments").populate("category").populate("uploadedBy");
		if (!project) {
			return res.status(404).json({
				success: false,
				status: 404,
				message: "Project not found",
			});
		}

		res.status(200).json({
			success: true,
			status: 200,
			data: {
				project,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};


// #swagger.tags = ['Project']
// #swagger.description = 'Project endpoint to delete a Project'
// #swagger.summary = 'Delete Project'
exports.deleteProject = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({
				success: false,
				status: 404,
				message: "Project not found",
			});
		}

		//delete Project from db
		await Project.deleteOne();
		res.status(200).json({
			success: true,
			status: 200,
			message: "Project deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};


// #swagger.tags = ['Project']
// #swagger.description = 'Project endpoint to update Project'
// #swagger.summary = 'Update Project'
exports.updateProject = async (req, res) => {
	try {
		let project = await Project.findByIdAndUpdate(req.params.id, req.body);
		if (!project) {
			console.log("not project")
			return res.status(404).json({
				success: false,
				status: 404,
				message: "Project not found",
			});
		}


		const moderators = await User.find({ role: "MODERATOR" });
		const admin = await User.findOne({ role: "ADMIN" });
		const currentUserId = req.body.creator;
		const updatedRecipients = moderators.filter((moderator) => moderator._id.toString() !== currentUserId);

		const notification = new Notification({
			action: `${project.name} was updated successfully`,
			doer: req.body.creator,
			recipients: [admin._id, ...updatedRecipients.map((moderator) => moderator._id),]
		})
		await notification.save()

		res.status(201).json({
			success: true,
			status: 201,
			message: "Project updated successfully",
			data: project,
		});
	} catch (error) {
		console.error("Error creating project:", error);
		return res.status(500).json({
			success: false,
			status: 500,
			message: "Internal server error",
		});
	}
};
