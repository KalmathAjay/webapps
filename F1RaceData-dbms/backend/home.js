const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();
const port = 4000;
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(cors());
app.use(express.json());

// MySQL database connection pool
const db = mysql.createPool({
  host: "127.0.0.1",
  user: " ",
  password: " ",
  database: "race_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to create database tables if not exists
async function createTables() {
  const tableQueries = [
    `CREATE TABLE IF NOT EXISTS driver (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      d_age INT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS team (
      t_id INT PRIMARY KEY,
      t_name VARCHAR(255),
      d_d1 INT,
      FOREIGN KEY (d_d1) REFERENCES driver(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS race_details (
      race_id INT AUTO_INCREMENT PRIMARY KEY,
      track_length INT NOT NULL,
      t_safety_car INT,
      weather VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS driver_championship (
      dc_id INT PRIMARY KEY,
      d_id INT,
      driver_race_wins INT NOT NULL,
      driver_total_points INT NOT NULL,
      FOREIGN KEY (d_id) REFERENCES driver(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS results (
      res_id INT PRIMARY KEY,
      d_id INT,
      driver_as_per_position INT,
      FOREIGN KEY (d_id) REFERENCES driver(id) ON DELETE CASCADE
    )`,
  ];

  for (const query of tableQueries) {
    try {
      await db.query(query);
      console.log("Table created or already exists");
    } catch (err) {
      console.error("Error creating table:", err);
    }
  }
}

// Routes for 'driver' table
app.get("/fetchAllData", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM driver");
    console.log("Driver data fetched successfully");
    res.status(200).json(result);
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error fetching data");
  }
});

app.post("/submit", async (req, res) => {
  const formData = req.body;
  try {
    await db.query("INSERT INTO driver SET ?", formData);
    console.log("Data submitted successfully");
    res.status(200).send("Data submitted successfully");
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error submitting data");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query("DELETE FROM driver WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      console.log(`Data with ID ${id} deleted successfully`);
      res.status(200).send(`Data with ID ${id} deleted successfully`);
    } else {
      console.log(`Data with ID ${id} not found`);
      res.status(404).send(`Data with ID ${id} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error deleting data");
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const [result] = await db.query("UPDATE driver SET ? WHERE id = ?", [
      updatedData,
      id,
    ]);
    if (result.affectedRows > 0) {
      console.log(`Data with ID ${id} updated successfully`);
      res.status(200).send(`Data with ID ${id} updated successfully`);
    } else {
      console.log(`Data with ID ${id} not found`);
      res.status(404).send(`Data with ID ${id} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error updating data");
  }
});

// Routes for 'team' table
app.get("/fetchAllTeams", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM team");
    console.log("Teams fetched successfully");
    res.status(200).json(result);
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error fetching teams");
  }
});

app.post("/addTeam", async (req, res) => {
  const teamData = req.body;
  try {
    await db.query("INSERT INTO team SET ?", teamData);
    console.log("Team added successfully");
    res.status(200).send("Team added successfully");
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error adding team");
  }
});

app.delete("/deleteTeam/:id", async (req, res) => {
  const teamId = req.params.id;
  try {
    const [result] = await db.query("DELETE FROM team WHERE t_id = ?", [
      teamId,
    ]);
    if (result.affectedRows > 0) {
      console.log(`Team with ID ${teamId} deleted successfully`);
      res.status(200).send(`Team with ID ${teamId} deleted successfully`);
    } else {
      console.log(`Team with ID ${teamId} not found`);
      res.status(404).send(`Team with ID ${teamId} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error deleting team");
  }
});

app.put("/updateTeam/:id", async (req, res) => {
  const teamId = req.params.id;
  const updatedTeamData = req.body;
  try {
    const [result] = await db.query("UPDATE team SET ? WHERE t_id = ?", [
      updatedTeamData,
      teamId,
    ]);
    if (result.affectedRows > 0) {
      console.log(`Team with ID ${teamId} updated successfully`);
      res.status(200).send(`Team with ID ${teamId} updated successfully`);
    } else {
      console.log(`Team with ID ${teamId} not found`);
      res.status(404).send(`Team with ID ${teamId} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error updating team");
  }
});

// Routes for 'race_details' table
app.get("/fetchAllRaceDetails", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM race_details");
    console.log("Race details fetched successfully");
    res.status(200).json(result);
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error fetching race details");
  }
});

app.post("/addRaceDetails", async (req, res) => {
  const raceDetailsData = req.body;
  try {
    await db.query("INSERT INTO race_details SET ?", raceDetailsData);
    console.log("Race details added successfully");
    res.status(200).send("Race details added successfully");
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error adding race details");
  }
});

app.delete("/deleteRaceDetails/:id", async (req, res) => {
  const raceDetailsId = req.params.id;
  try {
    const [result] = await db.query(
      "DELETE FROM race_details WHERE race_id = ?",
      [raceDetailsId]
    );
    if (result.affectedRows > 0) {
      console.log(`Race details with ID ${raceDetailsId} deleted successfully`);
      res
        .status(200)
        .send(`Race details with ID ${raceDetailsId} deleted successfully`);
    } else {
      console.log(`Race details with ID ${raceDetailsId} not found`);
      res.status(404).send(`Race details with ID ${raceDetailsId} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error deleting race details");
  }
});

app.put("/updateRaceDetails/:id", async (req, res) => {
  const raceDetailsId = req.params.id;
  const updatedRaceDetailsData = req.body;
  try {
    const [result] = await db.query(
      "UPDATE race_details SET ? WHERE race_id = ?",
      [updatedRaceDetailsData, raceDetailsId]
    );
    if (result.affectedRows > 0) {
      console.log(`Race details with ID ${raceDetailsId} updated successfully`);
      res
        .status(200)
        .send(`Race details with ID ${raceDetailsId} updated successfully`);
    } else {
      console.log(`Race details with ID ${raceDetailsId} not found`);
      res.status(404).send(`Race details with ID ${raceDetailsId} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error updating race details");
  }
});

// Routes for 'driver championships' table
app.get("/fetchAllDriverChampionships", async (req, res) => {
  const fetchAllDriverChampionshipsQuery = "SELECT * FROM driver_championship";

  try {
    const [result] = await db.query(fetchAllDriverChampionshipsQuery);
    console.log("Driver championships fetched successfully");
    res.status(200).json(result);
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error fetching driver championships");
  }
});

app.post("/addDriverChampionship", async (req, res) => {
  const driverChampionshipData = req.body;

  const insertDriverChampionshipQuery = "INSERT INTO driver_championship SET ?";

  try {
    const [result] = await db.query(
      insertDriverChampionshipQuery,
      driverChampionshipData
    );
    console.log("Driver championship added successfully", result);
    res.status(200).send("Driver championship added successfully");
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error adding driver championship");
  }
});

app.delete("/deleteDriverChampionship/:id", async (req, res) => {
  const driverChampionshipId = req.params.id;

  const deleteDriverChampionshipQuery =
    "DELETE FROM driver_championship WHERE dc_id = ?";

  try {
    const [result] = await db.query(deleteDriverChampionshipQuery, [
      driverChampionshipId,
    ]);
    if (result.affectedRows > 0) {
      console.log(
        `Driver championship with ID ${driverChampionshipId} deleted successfully`
      );
      res
        .status(200)
        .send(
          `Driver championship with ID ${driverChampionshipId} deleted successfully`
        );
    } else {
      console.log(
        `Driver championship with ID ${driverChampionshipId} not found`
      );
      res
        .status(404)
        .send(`Driver championship with ID ${driverChampionshipId} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error deleting driver championship");
  }
});

app.put("/updateDriverChampionship/:id", async (req, res) => {
  const driverChampionshipId = req.params.id;
  const updatedDriverChampionshipData = req.body;

  const updateDriverChampionshipQuery =
    "UPDATE driver_championship SET ? WHERE dc_id = ?";

  try {
    const [result] = await db.query(updateDriverChampionshipQuery, [
      updatedDriverChampionshipData,
      driverChampionshipId,
    ]);
    if (result.affectedRows > 0) {
      console.log(
        `Driver championship with ID ${driverChampionshipId} updated successfully`
      );
      res
        .status(200)
        .send(
          `Driver championship with ID ${driverChampionshipId} updated successfully`
        );
    } else {
      console.log(
        `Driver championship with ID ${driverChampionshipId} not found`
      );
      res
        .status(404)
        .send(`Driver championship with ID ${driverChampionshipId} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error updating driver championship");
  }
});

// Routes for 'results' table
app.get("/fetchAllResults", async (req, res) => {
  const fetchAllResultsQuery = "SELECT * FROM results";

  try {
    const [result] = await db.query(fetchAllResultsQuery);
    console.log("Results fetched successfully");
    res.status(200).json(result);
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error fetching results");
  }
});

app.post("/addResult", async (req, res) => {
  const resultData = req.body;

  const insertResultQuery = "INSERT INTO results SET ?";

  try {
    const [result] = await db.query(insertResultQuery, resultData);
    console.log("Result added successfully", result);
    res.status(200).send("Result added successfully");
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error adding result");
  }
});

app.delete("/deleteResult/:id", async (req, res) => {
  const resultId = req.params.id;

  const deleteResultQuery = "DELETE FROM results WHERE d_id = ?";

  try {
    const [result] = await db.query(deleteResultQuery, [resultId]);
    if (result.affectedRows > 0) {
      console.log(`Result with driver ID ${resultId} deleted successfully`);
      res
        .status(200)
        .send(`Result with driver ID ${resultId} deleted successfully`);
    } else {
      console.log(`Result with driver ID ${resultId} not found`);
      res.status(404).send(`Result with driver ID ${resultId} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error deleting result");
  }
});

app.put("/updateResult/:id", async (req, res) => {
  const resultId = req.params.id;
  const updatedResultData = req.body;

  const updateResultQuery = "UPDATE results SET ? WHERE d_id = ?";

  try {
    const [result] = await db.query(updateResultQuery, [
      updatedResultData,
      resultId,
    ]);
    if (result.affectedRows > 0) {
      console.log(`Result with driver ID ${resultId} updated successfully`);
      res
        .status(200)
        .send(`Result with driver ID ${resultId} updated successfully`);
    } else {
      console.log(`Result with driver ID ${resultId} not found`);
      res.status(404).send(`Result with driver ID ${resultId} not found`);
    }
  } catch (err) {
    console.error("MySQL query error:", err);
    res.status(500).send("Error updating result");
  }
});

// Start the server and create tables if not already created
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  createTables();
});
