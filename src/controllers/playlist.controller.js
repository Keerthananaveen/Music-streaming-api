const prisma = require("../services/prisma");

exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Playlist name required" });

    const playlist = await prisma.playlist.create({
      data: {
        name,
        userId: req.user.id,
      },
    });

    res.status(201).json({ success: true, playlist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error creating playlist" });
  }
};

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: req.user.id,
        deletedAt: null,
      },
      include: {
        songs: {
          where: { deletedAt: null },
          include: {
            song: { where: { deletedAt: null } },
          },
        },
      },
    });

    res.json({ success: true, playlists });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error fetching playlists" });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const playlist = await prisma.playlist.findFirst({
      where: { id: parseInt(id), deletedAt: null },
    });

    if (!playlist || playlist.userId !== req.user.id)
      return res.status(403).json({ success: false, message: "Forbidden" });

    const updated = await prisma.playlist.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.json({ success: true, playlist: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating playlist" });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await prisma.playlist.findFirst({
      where: { id: parseInt(req.params.playlistId), deletedAt: null },
    });

    if (!playlist || playlist.userId !== req.user.id)
      return res.status(403).json({ success: false, message: "Forbidden" });

    await prisma.playlist.update({
      where: { id: playlist.id },
      data: { deletedAt: new Date() },
    });

    res.json({ success: true, message: "Playlist soft-deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error deleting playlist" });
  }
};

exports.addSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await prisma.playlist.findFirst({
      where: { id: parseInt(playlistId), deletedAt: null },
    });
    if (!playlist || playlist.userId !== req.user.id)
      return res.status(403).json({ success: false, message: "Forbidden" });

    const song = await prisma.song.findFirst({
      where: { id: parseInt(songId), deletedAt: null },
    });
    if (!song)
      return res.status(404).json({ success: false, message: "Song not found" });

    await prisma.playlistSong.create({
      data: { playlistId: playlist.id, songId: song.id },
    });

    res.json({ success: true, message: "Song added to playlist" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error adding song" });
  }
};

exports.removeSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await prisma.playlist.findFirst({
      where: { id: parseInt(playlistId), deletedAt: null },
    });
    if (!playlist || playlist.userId !== req.user.id)
      return res.status(403).json({ success: false, message: "Forbidden" });

    await prisma.playlistSong.updateMany({
      where: { playlistId: playlist.id, songId: parseInt(songId) },
      data: { deletedAt: new Date() },
    });

    res.json({ success: true, message: "Song removed from playlist" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error removing song" });
  }
};
