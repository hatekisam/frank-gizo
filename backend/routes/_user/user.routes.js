const router = require("express").Router();
const {
	createUser,
	getAllUsers,
	getUser,
} = require("../../controllers/user/user.controller");
const { checkRole } = require("../../middleware/checkRole");

router.post(
	"/",
	// checkRole(["ADMIN", "MODERATOR"]),
	createUser
);
router.get("/", getAllUsers);
router.get("/:id", getUser);

// // #swagger.tags = ['Service']
// // #swagger.description = 'Service endpoint to delete a service'
// // #swagger.summary = 'Delete service'
// router.delete("/:id", checkRole(["ADMIN"]), deleteService);

// // #swagger.tags = ['Service']
// // #swagger.description = 'Service endpoint to update service'
// // #swagger.summary = 'Update service'
// router.put(
// 	"/:id",
// 	checkRole(["ADMIN", "MODERATOR"]),
// 	updateService
// );

module.exports = router;