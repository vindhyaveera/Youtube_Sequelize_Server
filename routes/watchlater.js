var express = require("express");
var router = express.Router();
const watchlaterController = require("../controller/watchlaterController");

router.post("/createwatch", watchlaterController.createwatchlater);
router.get("/viewAll", watchlaterController.viewAll);
router.post(
  "/getuserwatchlaterVideos/:userID",
  watchlaterController.getuserwatchlaterVideos
);
router.post(
  "/getuserwatchlaterShortsVideos/:userID",
  watchlaterController.getuserwatchlaterShortsVideos
);

router.get("/viewAllAssociate/:userId", watchlaterController.viewAllAssociate);
router.delete("/delete/:userid/:videosid/:type",watchlaterController.deleteUser);

module.exports = router;
