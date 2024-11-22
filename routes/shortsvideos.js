var express = require("express");
var router = express.Router();
const shortsvideosController = require("../controller/shortsvideosController");

router.post("/createshortsvideos", shortsvideosController.createshortsvideos);
router.get("/viewAll", shortsvideosController.viewAll);
router.get("/viewOne/:id", shortsvideosController.viewOne);
router.put("/update/:id", shortsvideosController.update);
router.delete("/deleteshortsvideos", shortsvideosController.deleteshortsvideos);

module.exports = router;
