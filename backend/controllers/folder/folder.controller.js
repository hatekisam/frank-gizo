const { Folder } = require("../../models/folders/folder.model");


const { uploadFile } = require("../../utils/uploadImage");
const { uploadVideo } = require("../../utils/uploadVideo");
const multer = require("multer");


exports.createFolder = async (req, res) => {
        try {
                const { name, description } = req.body;
                const folderExists = await Folder.findOne({ name });
                if (folderExists) {
                        return res.status(404).json({
                                success: false,
                                status: 404,
                                message: "Folder already exists",
                        });
                }
                const folder = new Folder({
                        name,
                        description
                });
                await folder.save();
                return res.status(201).json({
                        success: true,
                        status: 201,
                        message: "Folder created successfully",
                        data: { id: folder._id, ...folder },
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


exports.getAllFolders = async (req, res) => {
        try {
                const folders = await Folder.find();

                return res.status(200).json({
                        success: true,
                        status: 200,
                        message: "Folders retrieved successfully",
                        data: {
                                folders,
                        },
                });
        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "Internal server error",
                });
        }
};


exports.getFolder = async (req, res) => {
        try {
                console.log(req.params.id)
                const folder = await Folder.findById(req.params.id);
                if (!folder) {
                        return res.status(404).json({
                                success: false,
                                status: 404,
                                message: "Folder not found",
                        });
                }

                res.status(200).json({
                        success: true,
                        status: 200,
                        data: {
                                folder,
                        },
                });
        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "Internal server error",
                });
        }
};

exports.deleteFolder = async (req, res) => {
        try {
                const folder = await Folder.findByIdAndDelete(req.params.id);
                res.status(200).json({
                        success: true,
                        status: 200,
                        message: "Folderdeleted successfully",
                });
        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "Internal server error",
                });
        }
};


exports.updateFolder = async (req, res) => {
        try {
                const { name, images, videos, documents } = req.body;
                let folder = await Folder.findById(req.params.id);
                if (!folder) {
                        return res.status(404).json({
                                success: false,
                                status: 404,
                                message: "Folder not found",
                        });
                }
                const updateFolder = await Folder.findByIdAndUpdate(
                        req.params.id,
                        {
                                name,
                                images,
                                videos,
                                documents
                        },
                        {
                                new: true,
                        }
                );
                res.status(200).json({
                        success: true,
                        status: 200,
                        message: "Folder updated successfully",
                        data: {
                                updateFolder,
                        },
                });
        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "Internal server error",
                });
        }
};
