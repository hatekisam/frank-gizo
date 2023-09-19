
const { Category } = require("../../models/project/project.model");


//getting all Projects without pagination for mobile
exports.getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		return res.status(200).json({
			success: true,
			status: 200,
			message: "Project Catetories retrieved successfully",
			data: {
				categories,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};
exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({
				success: false,
				status: 404,
				message: "Category not found",
			});
		}

		res.status(200).json({
			success: true,
			status: 200,
			data: {
				category,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};

