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

const createTable = `CREATE TABLE IF NOT EXISTS people (
  id int not null auto_increment,
  name varchar(255),
  primary key (id)
)`;

function query(sql) {
  const connection = mysql.createConnection(config);
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

async function createPeople(name) {
  await query(createTable);
  const names = [
    "Rafael",
    "João",
    "Maria",
    "José",
    "Pedro",
    "Paulo",
    "Lucas",
    "Mateus",
    "Marcos",
  ];
  const selectedName = name ?? names[Math.floor(Math.random() * names.length)];
  const sql = `INSERT INTO people(name) VALUES('${selectedName}');`;
  await query(sql);
}

app.get("/", async (req, res) => {
  const name = req.query.name;
  await createPeople(name);

  const peoples = await query("SELECT * FROM people");
  let responseText = `<h1>Full Cycle Rocks!</h1>`;
  responseText += `<h2>People:</h2>`;
  responseText += `<ul>`;
  peoples.forEach((people) => (responseText += `<li>${people.name}</li>`));
  responseText += `</ul>`;
  res.send(responseText);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
