
const cloudinary = require("./cloudinary");
const { v4: uuidv4 } = require("uuid");
const streamifier = require("streamifier");

exports.uploadFile = async (req, res) => {
  const uploadedImages = [];
      const errorMessages = [];
      for (const file of req.watermarkedImages) {
        // Check if the uploaded file is an image
        // if (!file.mimetype.startsWith("image")) {
        //   errorMessages.push(`File '${file.originalname}' is not an image`);
        //   continue; // Skip processing this file
        // }

        // Upload the file to Cloudinary
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "services",
              public_id: uuidv4(),
            },
            (error, result) => {
              if (error) {
                reject({ message: "cloudinary", error });
              } else {
                uploadedImages.push(result.secure_url);
                resolve();
              }
            }
          );

          // Pipe the file buffer into the upload stream
          streamifier.createReadStream(file).pipe(stream);
        });
      }

  if (errorMessages.length > 0) {
        throw new Error(`Video upload failed: ${errorMessages.join(", ")}`);
     
    }
    return uploadedImages;
}