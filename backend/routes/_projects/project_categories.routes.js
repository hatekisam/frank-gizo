const router = require("express").Router();

const {
  
  getAllCategories,
  getCategory,
 
} = require("../../controllers/projects/project_categories.controller");



router.get("/", getAllCategories);


router.get("/:id", getCategory);



module.exports = router;
