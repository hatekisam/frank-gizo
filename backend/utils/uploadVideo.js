const cloudinary = require("./cloudinary");
const { v4: uuidv4 } = require("uuid");
const streamifier = require("streamifier");

exports.uploadVideo = async (req, res, next) => {
  const uploadedVideo = [];
  const errorMessages = [];

  for (const file of req.files.video) {
 
    if (!file.mimetype.startsWith("video")) {
      errorMessages.push(`File '${file.originalname}' is not video`);
      continue; 
    }

    
    await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "services",
          public_id: uuidv4(),
          resource_type: "video",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            uploadedVideo.push(result.secure_url);
            resolve();
          }
        }
      );

      // Pipe the file buffer into the upload stream
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }

  if (errorMessages.length > 0) {
throw new Error(`Video upload failed: ${errorMessages.join(", ")}`);
    
  }
  return uploadedVideo;
};
