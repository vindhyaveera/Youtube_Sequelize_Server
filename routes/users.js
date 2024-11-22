var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");
const userMiddleware = require("../Middleware/userMiddleware");

router.post(
  "/create",
  userMiddleware.registerVerify,
  userController.createUser
);
router.get("/viewAll", userController.viewAll);
router.get("/viewOne/:id", userController.viewOne);
router.put("/update/:id", userController.update);
router.delete("/delete", userController.deleteUser);
router.put("/login", userController.loginUser);
router.get("/getuserVideos/:id", userController.getuserVideos);
router.get("/getuserShortsVideos/:id", userController.getuserShortsVideos);

module.exports = router;
