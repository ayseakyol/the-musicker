const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM albums`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  getOne: (req, res) => {
    const id = parseInt(req.body.AlbumId);

    const sql = `SELECT  al.AlbumId, al.Title AS AlbumTitle, t.Name AS TrackName, a.Name AS ArtistName, t.composer
     FROM Albums al 
     LEFT JOIN Tracks t ON t.AlbumId = al.AlbumId
     LEFT JOIN Artists a ON al.ArtistId = a.ArtistId
     WHERE  al.AlbumId = ${id}`;

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
    const Title = req.body.Title;
    const ArtistId = req.body.ArtistId;

    const sql = `INSERT INTO Albums (
                       Title,
                       ArtistId
                   )
                   VALUES("${Title}", ${ArtistId})`;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      //res.json("The album is successfully added.");
      res.redirect("/");
    });
  },
  update: (req, res) => {
    // read row data from body
    const id = Number(req.body.AlbumId);
    const Title = req.body.Title;
    const ArtistId = req.body.ArtistId;

    const sql = `UPDATE albums
                 SET Title = '${Title}',
                     ArtistId = '${ArtistId}'
                 WHERE AlbumId = '${id}' `;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      //res.json("The album is successfully changed.");
      res.redirect("/");
    });
  },
  delete: (req, res) => {
    const id = Number(req.body.AlbumId);

    const sql = `DELETE FROM albums
    WHERE AlbumId = '${id}'`;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      //res.json("The album is successfully deleted.");
      res.redirect("/");
    });
  },
};

module.exports = controllers;
