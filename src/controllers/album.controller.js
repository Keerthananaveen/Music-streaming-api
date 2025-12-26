const prisma = require("../services/prisma");

exports.createAlbum = async (req, res) => {
  try {
    const { title, artistId } = req.body;
    if (!title || !artistId) return res.status(400).json({ success: false, message: "Title and artistId required" });

    const album = await prisma.album.create({ data: { title, artistId } });
    res.status(201).json({ success: true, album });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
