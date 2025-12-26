const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artist.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", authenticate, artistController.getArtists);
router.post("/", authenticate, authorize(["ADMIN"]), artistController.createArtist);

module.exports = router;
