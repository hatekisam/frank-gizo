const router = require("express").Router();
const { checkRole } = require("../../middleware/checkRole");
const { deleteFolder, getFolder, getAllFolders, createFolder, updateFolder } = require("../../controllers/folder/folder.controller");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({
        storage,
        limits: { fileSize: 300 * 1024 * 1024 },
});


router.post(
        "/",
        // checkRole("ADMIN"),
        createFolder
);



router.get("/", getAllFolders);


router.get("/:id", getFolder);


router.delete("/:id", checkRole(["ADMIN"]), deleteFolder);


router.patch(
        "/:id",
        checkRole(["ADMIN", "MODERATOR"]),
        upload.array("images", 5),
        updateFolder
);

module.exports = router;
