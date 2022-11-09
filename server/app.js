const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
const cors = require("cors");
app.use(cors());
const md5 = require("js-md5");
const uuid = require("uuid");
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "donations_database",
});

////////////////////LOGIN/////////////////

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf("/server")) {
    // admin
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 10) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    0 === req.url.indexOf("/login-check") ||
    0 === req.url.indexOf("/login") ||
    0 === req.url.indexOf("/register") ||
    0 === req.url.indexOf("/") ||
    0 === req.url.indexOf("/createFundraise")
  ) {
    next();
  } else {
    // fron
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  }
};

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
  const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error", status: 1 }); // user not logged
    } else {
      if ("admin" === req.query.role) {
        if (result[0].role !== 10) {
          res.send({ msg: "error", status: 2 }); // not an admin
        } else {
          res.send({ msg: "ok", status: 3 }); // is admin
        }
      } else {
        res.send({ msg: "ok", status: 4 }); // is user
      }
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

app.get("/login/:session", (req, res) => {
  const sql = `
         SELECT id
         FROM users
         WHERE session = ?
    `;
  con.query(sql, [req.params.session], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/register", (req, res) => {
  const sql = `
    INSERT INTO users (name, psw)
    VALUES (?, ?)
  `;
  con.query(sql, [req.body.name, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////////////////END////////////////////

// Create Fundraise
// CREATE
app.post("/user/create", (req, res) => {
  const sql = `
    INSERT INTO ideas (title, description, goal, left_to_reach, image)
    VALUES (?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.description,
      req.body.goal,
      req.body.left_to_reach,
      req.body.image,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Admin Ideas

app.get("/admin/ideas", (req, res) => {
  const sql = `
    SELECT *
    FROM ideas 
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/admin/ideas/:id", (req, res) => {
  const sql = `
    UPDATE ideas
    SET state = ?
    WHERE id = ?
    `;
  con.query(sql, [req.body.state, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/admin/ideas/:id", (req, res) => {
  const sql = `
    DELETE FROM ideas
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Home CRUD

app.get("/home/ideas", (req, res) => {
  const sql = `
    SELECT i.*, d.name, d.donation, d.id as did
    FROM ideas AS i
    LEFT JOIN donations AS d
    ON i.id = d.idea_id
    ORDER BY left_to_reach DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/home/donations/:id", (req, res) => {
  const sql = `
    INSERT INTO donations (name, donation, idea_id)
    VALUES (?, ?, ?)
    `;
  con.query(
    sql,
    [req.body.name, req.body.donation, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.put("/home/sum/:id", (req, res) => {
  const sql = `
    UPDATE ideas
    SET 
    current_balance = current_balance + ?,
    left_to_reach = goal - current_balance
    WHERE id = ?
    `;
  con.query(sql, [req.body.donation, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Rūbų parduotuvė dirba per ${port} portą!`);
});
