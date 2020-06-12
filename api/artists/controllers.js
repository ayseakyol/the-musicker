const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM artists`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  getOne: (req, res) => {
    const id = Number(req.body.ArtistId);

    const sql = `SELECT a.ArtistId, a.Name AS ArtistName, al.AlbumId, al.Title AS AlbumTitle, t.Name AS TrackName, t.composer
    FROM Artists a
    LEFT JOIN Albums al ON a.ArtistId = al.ArtistId
    LEFT JOIN Tracks t ON t.AlbumId = al.AlbumId
    WHERE  a.ArtistId = '${id}'`;

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

    const sql = `INSERT INTO Artists (
                       Name
                   )
                   VALUES("${Name}")`;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      //res.json("The artist is successfully added.");
      res.redirect("/artists.html");
    });
  },
  update: (req, res) => {
    // read row data from body
    const id = Number(req.body.ArtistId);
    const Name = req.body.Name;

    const sql = `UPDATE artists
                 SET Name = '${Name}'
                 WHERE ArtistId = '${id}' `;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      //res.json("The artist is successfully changed.");
      res.redirect("/artists.html");
    });
  },
  delete: (req, res) => {
    const id = Number(req.params.ArtistId);

    const sql = `DELETE FROM artists
    WHERE ArtistId = '${id}'`;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      //res.json("The artist is successfully deleted.");
      res.redirect("/artists.html");
    });
  },
};

module.exports = controllers;
