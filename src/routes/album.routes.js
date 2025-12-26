const express = require("express");
const router = express.Router();
const albumController = require("../controllers/album.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", authenticate, albumController.getAlbums);
router.post("/", authenticate, authorize(["ADMIN"]), albumController.createAlbum);
router.put("/:id", authenticate, authorize(["ADMIN"]), albumController.updateAlbum);
router.delete("/:id", authenticate, authorize(["ADMIN"]), albumController.deleteAlbum);

module.exports = router;
