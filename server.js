const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const pool = mysql.createPool({
  host: "localhost", // MySQL host (usually localhost)
  port: 3306, // MySQL port (default is 3306)
  user: "root", // MySQL username
  password: process.env.MYSQL_PASSWORD, // MySQL password
  database: "sys", // MySQL database name
});

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
    });
  });
};

// on init get user plant data
app.get("/api/data", async (req, res) => {
  try {
    const connection = await getConnection();

    const results = await connection
      .promise()
      .query("SELECT * FROM plant_users");

    connection.release();

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/submit", async (req, res) => {
  const plant = req.body.plant;
  const name = req.body.name;

  console.log("PLANT:", plant);
  console.log("NAME:", name);

  if (!name || !plant) {
    return res
      .status(400)
      .json({ error: "Name and favorite plant are required!" });
  }

  const sql = "INSERT INTO plant_users (fName, favPlant) VALUES (?, ?);";

  console.log("SQL:", sql);

  try {
    const connection = await getConnection();
    await connection.promise().query(sql, [name, plant]);

    connection.release();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Express server listening on port 3000...");
});
