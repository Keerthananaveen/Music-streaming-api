const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/artists", require("./routes/artist.routes"));
app.use("/api/albums", require("./routes/album.routes"));
app.use("/api/songs", require("./routes/song.routes"));
app.use("/api/playlists", require("./routes/playlist.routes"));
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

module.exports = app;