const prisma = require("../services/prisma");

exports.createAlbum = async (req, res) => {
  try {
    const { title, artistId } = req.body;
    if (!title || !artistId)
      return res.status(400).json({ success: false, message: "Title and artistId required" });

    const album = await prisma.album.create({
      data: { title, artistId },
    });

    res.status(201).json({ success: true, album });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAlbums = async (req, res) => {
  try {
    const albums = await prisma.album.findMany({
      where: { deletedAt: null },
      include: {
        artist: true,
        songs: { where: { deletedAt: null } },
      },
    });

    res.json({ success: true, albums });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const album = await prisma.album.update({
      where: { id: parseInt(id) },
      data: { title },
    });

    res.json({ success: true, album });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating album" });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    await prisma.album.update({
      where: { id: parseInt(req.params.id) },
      data: { deletedAt: new Date() },
    });

    res.json({ success: true, message: "Album soft-deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting album" });
  }
};
