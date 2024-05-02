const {Router} = require("express");
const ensureAuthenticated =require("../middleware/ensureAuthenticated.js");


const tagsRoutes = Router();








const TagsController = require("../controllers/TagsController");

const tagsController = new TagsController();


tagsRoutes.get("/",ensureAuthenticated, tagsController.index);





module.exports = tagsRoutes;