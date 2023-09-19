
// const sharp = require("sharp");
// const path = require('path');

// const addWatermark = async (req, res, next) => {
// 	if (!req.files || !req.files.images) {
// 		return res.status(400).json({ message: "No images uploaded" });
// 	}

// 	const images = req.files.images;
// 	const watermarkImagePath = path.join(
// 		__dirname, "..", "constants", "images",
// 		"watermark.png"
// 	);

// 	const watermarkOptions = {
// 		// gravity: sharp.gravity,
// 	};

// 	Promise.all(
// 		return images
// 	)
// 		.then((watermarkedImages) => {
// 		req.watermarkedImages = watermarkedImages;
// 		next();
// 	})
// 	.catch((err) => {
// 		console.error("Error processing images:", err);
// 		return res.status(500).json({ message: "Error processing images" });
// 	});
// }

// module.exports = addWatermark;