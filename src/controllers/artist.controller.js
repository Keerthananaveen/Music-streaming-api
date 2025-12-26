const prisma = require("../services/prisma");

exports.createArtist = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Artist name required" });

    const artist = await prisma.artist.create({ data: { name } });
    res.status(201).json({ success: true, artist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getArtists = async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      where: { deletedAt: null },
      include: {
        albums: {
          where: { deletedAt: null },
        },
      },
    });
    res.json({ success: true, artists });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const artist = await prisma.artist.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.json({ success: true, artist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating artist" });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    await prisma.artist.update({
      where: { id: parseInt(req.params.id) },
      data: { deletedAt: new Date() },
    });

    res.json({ success: true, message: "Artist soft-deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting artist" });
  }
};
