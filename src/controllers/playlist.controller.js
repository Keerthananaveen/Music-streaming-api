const prisma = require("../services/prisma");

exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Playlist name is required" });

    const playlist = await prisma.playlist.create({
      data: {
        name,
        userId: req.user.id,
      },
    });

    res.status(201).json({ success: true, playlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error creating playlist" });
  }
};

exports.addSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    if (!playlistId || !songId) return res.status(400).json({ success: false, message: "Playlist ID and Song ID are required" });

    const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } });
    if (!playlist) return res.status(404).json({ success: false, message: "Playlist not found" });
    if (playlist.userId !== req.user.id) return res.status(403).json({ success: false, message: "Forbidden: cannot modify this playlist" });

    await prisma.playlistSong.create({
      data: {
        playlistId,
        songId,
      },
    });

    res.json({ success: true, message: "Song added to playlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error adding song" });
  }
};

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: { userId: req.user.id },
      include: {
        songs: {
          include: {
            song: true,
          },
        },
      },
    });

    res.json({ success: true, playlists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error fetching playlists" });
  }
};

exports.removeSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await prisma.playlist.findUnique({ where: { id: parseInt(playlistId) } });
    if (!playlist) return res.status(404).json({ success: false, message: "Playlist not found" });
    if (playlist.userId !== req.user.id) return res.status(403).json({ success: false, message: "Forbidden: cannot modify this playlist" });

    await prisma.playlistSong.deleteMany({
      where: { playlistId: parseInt(playlistId), songId: parseInt(songId) },
    });

    res.json({ success: true, message: "Song removed from playlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error removing song" });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await prisma.playlist.findUnique({ where: { id: parseInt(playlistId) } });
    if (!playlist) return res.status(404).json({ success: false, message: "Playlist not found" });
    if (playlist.userId !== req.user.id) return res.status(403).json({ success: false, message: "Forbidden: cannot delete this playlist" });

    await prisma.playlist.delete({ where: { id: parseInt(playlistId) } });

    res.json({ success: true, message: "Playlist deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error deleting playlist" });
  }
};
