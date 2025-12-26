const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const playlistController = require("../controllers/playlist.controller");

router.post("/", authenticate, playlistController.createPlaylist);
router.post("/add-song", authenticate, playlistController.addSong);
router.get("/", authenticate, playlistController.getPlaylists);
router.delete("/:playlistId", authenticate, playlistController.deletePlaylist);
router.delete("/:playlistId/remove-song/:songId", authenticate, playlistController.removeSong);

module.exports = router;
