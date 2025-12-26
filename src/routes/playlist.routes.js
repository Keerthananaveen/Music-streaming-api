const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const playlistController = require("../controllers/playlist.controller");

router.get("/", authenticate, playlistController.getPlaylists);
router.post("/", authenticate, playlistController.createPlaylist);
router.put("/:id", authenticate, playlistController.updatePlaylist);
router.delete("/:playlistId", authenticate, playlistController.deletePlaylist);
router.post("/:playlistId/songs/:songId", authenticate, playlistController.addSong);
router.delete("/:playlistId/songs/:songId", authenticate, playlistController.removeSong);

module.exports = router;
