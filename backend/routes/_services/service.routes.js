const router = require("express").Router();
const multer = require("multer");
const {
	createService,
	getAllServices,
	getService,
	deleteService,
	updateService,
} = require("../../controllers/services/service.controller");
const { checkRole } = require("../../middleware/checkRole");

// #swagger.tags = ['Service']
// #swagger.description = 'Service endpoint to create new service'
// #swagger.summary = 'Create service'
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
	storage
});
// router.post(
//   "/",
//   checkRole(["ADMIN", "MODERATOR"]),
//   upload.array("image", 1),
//   createService
// );
router.post(
	"/",
	// checkRole(["ADMIN", "MODERATOR"]),
	upload.array("image", 1),
	createService
);
// #swagger.tags = ['Service']
// #swagger.description = 'Service endpoint to get all services'
// #swagger.summary = 'Get all services'

router.get("/", getAllServices);

// #swagger.tags = ['Service']
// #swagger.description = 'Service endpoint to get a service'
// #swagger.summary = 'Get service'
router.get("/:id", getService);

// #swagger.tags = ['Service']
// #swagger.description = 'Service endpoint to delete a service'
// #swagger.summary = 'Delete service'
router.delete("/:id", checkRole(["ADMIN"]), deleteService);

// #swagger.tags = ['Service']
// #swagger.description = 'Service endpoint to update service'
// #swagger.summary = 'Update service'
router.put(
	"/:id",
	checkRole(["ADMIN", "MODERATOR"]),
	upload.array("image", 1),
	updateService
);

module.exports = router;
