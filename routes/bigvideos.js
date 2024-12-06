var express = require("express");
var router = express.Router();
const bigvideosController = require("../controller/bigvideosController");

router.post("/createbigvideos", bigvideosController.createbigvideos);
router.get("/viewAll", bigvideosController.viewAll);
router.get("/viewOne/:id", bigvideosController.viewOne);
router.put("/update/:id", bigvideosController.update);
router.delete("/deletebigvideos", bigvideosController.deletebigvideos);
router.get("/viewChannels/:channel", bigvideosController.viewChannels);


module.exports = router;
