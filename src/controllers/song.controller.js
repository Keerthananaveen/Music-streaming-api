const prisma = require("../services/prisma");

exports.createSong = async (req, res) => {
  try {
    const { title, duration, albumId } = req.body;
    if (!title || !duration || !albumId)
      return res.status(400).json({ success: false, message: "All fields required" });

    const song = await prisma.song.create({
      data: { title, duration, albumId },
    });

    res.status(201).json({ success: true, song });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getSongs = async (req, res) => {
  try {
    const songs = await prisma.song.findMany({
      where: { deletedAt: null },
      include: {
        album: {
          include: {
            artist: true,
          },
        },
      },
    });

    res.json({ success: true, songs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration } = req.body;

    const song = await prisma.song.update({
      where: { id: parseInt(id) },
      data: { title, duration },
    });

    res.json({ success: true, song });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating song" });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    await prisma.song.update({
      where: { id: parseInt(req.params.id) },
      data: { deletedAt: new Date() },
    });

    res.json({ success: true, message: "Song soft-deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting song" });
  }
};
