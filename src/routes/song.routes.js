const express = require("express");
const router = express.Router();
const songController = require("../controllers/song.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", authenticate, songController.getSongs);
router.post("/", authenticate, authorize(["ADMIN"]), songController.createSong);
router.put("/:id", authenticate, authorize(["ADMIN"]), songController.updateSong);
router.delete("/:id", authenticate, authorize(["ADMIN"]), songController.deleteSong);

module.exports = router;
