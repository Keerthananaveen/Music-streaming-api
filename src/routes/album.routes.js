const express = require("express");
const router = express.Router();
const albumController = require("../controllers/album.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post("/", authenticate, authorize(["ADMIN"]), albumController.createAlbum);

module.exports = router;
