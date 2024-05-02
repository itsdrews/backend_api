const {Router} = require("express");

const usersRoutes = Router();

const multer = require("multer");

const uploadConfig = require("../configs/upload.js")

const upload = multer(uploadConfig.MULTER);


const UserAvatarController = require("../controllers/UserAvatarController");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated =require("../middleware/ensureAuthenticated.js");

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);

usersRoutes.put("/", ensureAuthenticated ,usersController.update);

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"),userAvatarController.update)

module.exports =usersRoutes ;