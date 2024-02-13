const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const config = {
  host: "db",
  port: "3306",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) VALUES('Rafael')`;
connection.query(sql);
connection.end();

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
