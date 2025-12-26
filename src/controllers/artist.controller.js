const prisma = require("../services/prisma");

exports.createArtist = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Artist name required" });

    const artist = await prisma.artist.create({ data: { name } });
    res.status(201).json({ success: true, artist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getArtists = async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({ include: { albums: true } });
    res.json({ success: true, artists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
