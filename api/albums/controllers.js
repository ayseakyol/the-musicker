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
    const id = Number(req.params.id);

    const sql = `SELECT * FROM albums WHERE  AlbumId = '${id}'`;

    db.get(sql, (err, row) => {
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

      res.json("The album is successfully added.");
    });
  },
  update: (req, res) => {
    // read row data from body
    const id = Number(req.params.id);
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

      res.json("The album is successfully changed.");
    });
  },
  delete: (req, res) => {
    const id = Number(req.params.id);

    const sql = `DELETE FROM albums
    WHERE AlbumId = '${id}'`;

    db.run(sql, (err, msg) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json("The album is successfully deleted.");
    });
  },
};

module.exports = controllers;
