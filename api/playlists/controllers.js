const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM playlists`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  getOne: (req, res) => {
    const id = Number(req.body.PlaylistId);

    const sql = `SELECT p.playlistId, p.Name as PlaylistName, pt.trackId, t.Name as TrackName, t.composer
     FROM playlists p
     INNER JOIN Playlist_track pt ON p.playlistId = pt.playlistId
     INNER JOIN Tracks t ON pt.TrackId = t.TrackId
     WHERE  p.PlaylistId = '${id}'`;

    db.all(sql, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(row);
    });
  },
  create: (req, res) => {
    // read row data from body
    const Name = req.body.Name;

    const sql = `INSERT INTO playlists (
                       Name
                   )
                   VALUES("${Name}")`;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      //res.json("The playlist is successfully added.")
      res.redirect("/playlists.html");
    });
  },
  update: (req, res) => {
    // read row data from body
    const id = Number(req.body.PlaylistId);
    const Name = req.body.Name;

    const sql = `UPDATE playlists
                 SET Name = '${Name}'
                 WHERE PlaylistId = ${id} `;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.redirect("/playlists.html");
      //res.json("The playlist is successfully changed.");
    });
  },
  delete: (req, res) => {
    const id = Number(req.body.PlaylistId);

    const sql = `DELETE FROM playlists
    WHERE PlaylistId = '${id}'`;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.redirect("/playlists.html");
      //res.json("The playlist is successfully deleted.");
    });
  },
};

module.exports = controllers;
