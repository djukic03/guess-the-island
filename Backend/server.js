import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";
import axios from "axios";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());

app.use(express.json());

app.get("/api/jobfair", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jobfair.nordeus.com/jf24-fullstack-challenge/test"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data from the external API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const connection = mysql.createConnection({
  host: "guess_the_island_db",
  user: "admin",
  password: "admin",
  database: "guess_the_island_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");

  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
      password VARCHAR(255) NOT NULL
    );`;

  connection.query(createUsersTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Users table created successfully");
  });

  const insertIntoUsersTableQuery = `
    INSERT IGNORE INTO users (username, password) VALUES ("admin", "admin")
  `;

  connection.query(insertIntoUsersTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Admin user inserted successfully");
  });
});

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
