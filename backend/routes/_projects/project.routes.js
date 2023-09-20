const router = require("express").Router();
const multer = require("multer");
const {
	createProject,
	getAllProjects,
	getProject,
	deleteProject,
	updateProject,
} = require("../../controllers/projects/project.controller");
const { checkRole } = require("../../middleware/checkRole");
const addWatermark = require("../../middleware/addWaterMark");


const storage = multer.memoryStorage();
const upload = multer({
	storage,
	limits: { fileSize: 300 * 1024 * 1024 },
});
router.post(
	"/",
	createProject
);
// router.post(
//   "/",
//   checkRole(["ADMIN", "MODERATOR"]),
//   upload.array("images", 5),
//   createProject
// );


router.get("/", getAllProjects);


router.get("/:id", getProject);


router.delete("/:id"
// , 
// async (req, res, next) => {
// 	// Get the token from the Authorization header
// 	const authHeader = req.headers['Authorization'];
// 	console.log(authHeader)
// 	if (!authHeader) {
// 		return res.status(401).json({ message: 'Authorization header is missing' });
// 	}

// 	const token = authHeader.split(' ')[1]; // Assuming it's in the format 'Bearer <token>'
// 	console.log(token);
// 	if (!token) {
// 		return res.status(401).json({ message: 'Token is missing in Authorization header' });
// 	}

// 	try {
// 		const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
// 		const userId = decodedToken.userId;
// 		const user = await User.findById(userId);
// 		if (!user) {
// 			return res.status(401).json({ message: 'User not found' });
// 		}
// 		req.user = user;
// 		next();
// 	} catch (err) {
// 		return res.status(401).json({ message: 'Invalid token' });
// 	}
// }, checkRole(["ADMIN"])
, deleteProject);


router.patch(
	"/:id",
	// checkRole(["ADMIN", "MODERATOR"]),
	// upload.array("images", 5),
	updateProject
);

module.exports = router;
