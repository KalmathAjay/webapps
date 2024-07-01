import React, { useEffect, useState } from "react";
import "./App.css";
import TableSlider from "./TableSlider";

function AppRouter() {
  const [driverDetails, setDriverDetails] = useState([]);
  const [teams, setTeams] = useState([]);
  const [raceDetails, setRaceDetails] = useState([]);
  const [driverChampionship, setDriverChampionship] = useState([]);
  const [raceResults, setRaceResults] = useState([]);

  useEffect(() => {
    fetchDriverDetails();
    fetchAllTeams();
    fetchAllRaceDetails();
    fetchDriverChampionship();
    fetchRaceResults();
  }, []);

  /*--------------------------------------------------Driver--------------------------------------------------*/

  // Function to submit Driver Data
  const submitDriverData = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      console.log(data);
      fetchDriverDetails();
    } catch (error) {
      console.error("Error submitting driver data:", error);
    }
  };

  // Function to update Driver Details
  const updateDriverDetails = async (id) => {
    const formData = {
      name: prompt("Enter new driver name:"),
      d_age: prompt("Enter new driver age:"),
    };

    try {
      const response = await fetch(`http://localhost:4000/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      console.log(data);
      fetchDriverDetails();
    } catch (error) {
      console.error("Error updating driver data:", error);
    }
  };

  // Function to delete Driver Details
  const deleteDriverDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.text();
      console.log(data);
      fetchDriverDetails();
    } catch (error) {
      console.error("Error deleting driver data:", error);
    }
  };

  // Function to fetch Driver Details
  const fetchDriverDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/fetchAllData");
      const data = await response.json();
      setDriverDetails(data);
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  /*--------------------------------------------------Team--------------------------------------------------*/

  // Function to submit Team Data
  const submitTeamData = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/addTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      console.log(data);
      fetchAllTeams();
    } catch (error) {
      console.error("Error submitting team data:", error);
    }
  };

  // Function to update Team Details
  const updateTeamDetails = async (t_id) => {
    const formData = {
      t_name: prompt("Enter new Team name:"),
      d_d1: prompt("Enter new driver id:"),
    };

    try {
      const response = await fetch(`http://localhost:4000/updateTeam/${t_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      console.log(data);
      fetchAllTeams();
    } catch (error) {
      console.error("Error updating team data:", error);
    }
  };

  // Function to delete Team Details
  const deleteTeamDetails = async (t_id) => {
    try {
      const response = await fetch(`http://localhost:4000/deleteTeam/${t_id}`, {
        method: "DELETE",
      });
      const data = await response.text();
      console.log(data);
      fetchAllTeams();
    } catch (error) {
      console.error("Error deleting team data:", error);
    }
  };

  // Function to fetch all Teams
  const fetchAllTeams = async () => {
    try {
      const response = await fetch("http://localhost:4000/fetchAllTeams");
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  /*--------------------------------------------------Race Details--------------------------------------------------*/

  // Function to submit Race Details Data
  const submitRaceDetailsData = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/addRaceDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      console.log(data);
      fetchAllRaceDetails();
    } catch (error) {
      console.error("Error submitting race details data:", error);
    }
  };

  // Function to update Race Details Data
  const updateRaceDetailsData = async (race_id) => {
    const formData = {
      track_length: prompt("Enter new tracklength"),
      t_safety_car: prompt("Enter new safetycar:"),
      weather: prompt("Enter new weather:"),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/updateRaceDetails/${race_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.text();
      console.log(data);
      fetchAllRaceDetails();
    } catch (error) {
      console.error("Error updating race details data:", error);
    }
  };

  // Function to delete Race Details Data
  const deleteRaceDetailsData = async (race_id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/deleteRaceDetails/${race_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.text();
      console.log(data);
      fetchAllRaceDetails();
    } catch (error) {
      console.error("Error deleting race details data:", error);
    }
  };

  // Function to fetch all Race Details
  const fetchAllRaceDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/fetchAllRaceDetails");
      const data = await response.json();
      setRaceDetails(data);
    } catch (error) {
      console.error("Error fetching race details data:", error);
    }
  };

  /*--------------------------------------------------Driver Championship--------------------------------------------------*/

  // Function to submit Driver Championship Data
  const submitDriverChampionship = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:4000/addDriverChampionship",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.text();
      console.log(data);
      fetchDriverChampionship();
    } catch (error) {
      console.error("Error submitting driver championship data:", error);
    }
  };

  // Function to update Driver Championship Data
  const updateDriverChampionship = async (dc_id) => {
    const formData = {
      d_id: prompt("Enter new driver id"),
      driver_race_wins: prompt("Enter new race wins:"),
      driver_total_points: prompt("Enter new total points:"),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/updateDriverChampionship/${dc_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.text();
      console.log(data);
      fetchDriverChampionship();
    } catch (error) {
      console.error("Error updating driver championship data:", error);
    }
  };

  // Function to delete Driver Championship Data
  const deleteDriverChampionship = async (dc_id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/deleteDriverChampionship/${dc_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.text();
      console.log(data);
      fetchDriverChampionship();
    } catch (error) {
      console.error("Error deleting driver championship data:", error);
    }
  };

  // Function to fetch Driver Championship Data
  const fetchDriverChampionship = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/fetchAllDriverChampionships"
      );
      const data = await response.json();
      setDriverChampionship(data);
    } catch (error) {
      console.error("Error fetching driver championship data:", error);
    }
  };

  /*--------------------------------------------------Race Results--------------------------------------------------*/

  // Function to submit Race Results Data
  const submitRaceResults = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/addResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      console.log(data);
      fetchRaceResults();
    } catch (error) {
      console.error("Error submitting race results data:", error);
    }
  };

  // Function to update Race Results Data
  const updateRaceResults = async (res_id) => {
    const formData = {
      d_id: prompt("Enter new driver id"),
      driver_as_per_position: prompt("Enter new position:"),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/updateResult/${res_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.text();
      console.log(data);
      fetchRaceResults();
    } catch (error) {
      console.error("Error updating race results data:", error);
    }
  };

  // Function to delete Race Results Data
  const deleteRaceResults = async (res_id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/deleteResult/${res_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.text();
      console.log(data);
      fetchRaceResults();
    } catch (error) {
      console.error("Error deleting race results data:", error);
    }
  };

  // Function to fetch Race Results Data
  const fetchRaceResults = async () => {
    try {
      const response = await fetch("http://localhost:4000/fetchAllResults");
      const data = await response.json();
      setRaceResults(data);
    } catch (error) {
      console.error("Error fetching race results data:", error);
    }
  };

  return (
    <div className="bg">
      <h1>RACE MANAGEMENT SYSTEM</h1>

      {/*--------------------------------------------------Form for data input html--------------------------------------------------*/}

      {/* Form for Driver Data */}
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            id: e.target.id.value,
            name: e.target.name.value,
            d_age: e.target.d_age.value,
          };
          submitDriverData(formData);
        }}
      >
        <h2>Driver Data</h2>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" required />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="d_age">Age:</label>
        <input type="text" id="d_age" name="d_age" required />
        <button className="mama" type="submit">
          Submit Driver Data
        </button>
      </form>

      {/* Form for Teams Data */}
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            t_id: e.target.t_id.value,
            t_name: e.target.t_name.value,
            d_d1: e.target.d_d1.value,
          };
          submitTeamData(formData);
        }}
      >
        <h2>Teams Data</h2>
        <label htmlFor="t_id">Team ID:</label>
        <input type="text" id="t_id" name="t_id" required />
        <label htmlFor="t_name">Team Name:</label>
        <input type="text" id="t_name" name="t_name" required />
        <label htmlFor="d_d1">Driver:</label>
        <input type="text" id="d_d1" name="d_d1" required />
        <button className="mama" type="submit">
          Submit Team Data
        </button>
      </form>

      {/* Form for Race Details Data */}
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            race_id: e.target.race_id.value,
            track_length: e.target.track_length.value,
            t_safety_car: e.target.t_safety_car.value,
            weather: e.target.weather.value,
          };
          submitRaceDetailsData(formData);
        }}
      >
        <h2>Race Details Data</h2>
        <label htmlFor="race_id">Race ID:</label>
        <input type="number" id="race_id" name="race_id" required />
        <label htmlFor="track_length">Track Length:</label>
        <input type="number" id="track_length" name="track_length" required />
        <label htmlFor="t_safety_car">Total Safety Car:</label>
        <input type="number" id="t_safety_car" name="t_safety_car" required />
        <label htmlFor="weather">Weather:</label>
        <input type="text" id="weather" name="weather" required />
        <button className="mama" type="submit">
          Submit Race Details Data
        </button>
      </form>

      {/* Form for Driver Championship Data */}
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            dc_id: e.target.dc_id.value,
            d_id: e.target.d_id.value,
            driver_race_wins: e.target.driver_race_wins.value,
            driver_total_points: e.target.driver_total_points.value,
          };
          submitDriverChampionship(formData);
        }}
      >
        <h2>Driver Championship Data</h2>
        <label htmlFor="dc_id">Championship ID:</label>
        <input type="number" id="dc_id" name="dc_id" required />
        <label htmlFor="d_id">Driver ID:</label>
        <input type="number" id="d_id" name="d_id" required />
        <label htmlFor="driver_race_wins">Race Wins:</label>
        <input
          type="number"
          id="driver_race_wins"
          name="driver_race_wins"
          required
        />
        <label htmlFor="driver_total_points">Total Points:</label>
        <input
          type="number"
          id="driver_total_points"
          name="driver_total_points"
          required
        />
        <button className="mama" type="submit">
          Submit Driver Championship Data
        </button>
      </form>

      {/* Form for Race Results Data */}
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            res_id: e.target.res_id.value,
            d_id: e.target.d_id.value,
            driver_as_per_position: e.target.driver_as_per_position.value,
          };
          submitRaceResults(formData);
        }}
      >
        <h2>Race Results Data</h2>
        <label htmlFor="res_id">Result ID:</label>
        <input type="number" id="res_id" name="res_id" required />
        <label htmlFor="d_id">Driver ID:</label>
        <input type="number" id="d_id" name="d_id" required />
        <label htmlFor="driver_as_per_position">Position:</label>
        <input
          type="number"
          id="driver_as_per_position"
          name="driver_as_per_position"
          required
        />

        <button className="mama" type="submit">
          Submit Race Results Data
        </button>
      </form>

      {/*--------------------------------------------------Display html --------------------------------------------------*/}

      <TableSlider>
        {/* Display Driver Details */}
        <div className="table-container">
          <h2 className="table-h2"> Driver Data</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {driverDetails.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.d_age}</td>
                  <td>
                    <button
                      className="mama"
                      onClick={() => updateDriverDetails(row.id)}
                    >
                      Update
                    </button>
                    <button
                      className="mama"
                      onClick={() => deleteDriverDetails(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Display Teams Data */}
        <div className="table-container">
          <h2 className="table-h2"> Teams Data</h2>
          <table>
            <thead>
              <tr>
                <th>TeamID</th>
                <th>Team Name</th>
                <th>ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((row) => (
                <tr key={row.t_id}>
                  <td>{row.t_id}</td>
                  <td>{row.t_name}</td>
                  <td>{row.d_d1}</td>
                  <td>
                    <button
                      className="mama"
                      onClick={() => updateTeamDetails(row.t_id)}
                    >
                      Update
                    </button>
                    <button
                      className="mama"
                      onClick={() => deleteTeamDetails(row.t_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Display Race Details Data */}
        <div className="table-container">
          <h2 className="table-h2"> Race Details Data</h2>
          <table>
            <thead>
              <tr>
                <th>RaceID</th>
                <th>Track Length</th>
                <th>Total Safety Car</th>
                <th>Weather</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {raceDetails.map((row) => (
                <tr key={row.race_id}>
                  <td>{row.race_id}</td>
                  <td>{row.track_length}</td>
                  <td>{row.t_safety_car}</td>
                  <td>{row.weather}</td>
                  <td>
                    <button
                      className="mama"
                      onClick={() => updateRaceDetailsData(row.race_id)}
                    >
                      Update
                    </button>
                    <button
                      className="mama"
                      onClick={() => deleteRaceDetailsData(row.race_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Display Driver Championship Data */}
        <div className="table-container">
          <h2 className="table-h2"> Driver Championship Data</h2>
          <table>
            <thead>
              <tr>
                <th>ChampionID</th>
                <th>ID</th>
                <th>RaceWins</th>
                <th>Totalpoints</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {driverChampionship.map((row) => (
                <tr key={row.dc_id}>
                  <td>{row.dc_id}</td>
                  <td>{row.d_id}</td>
                  <td>{row.driver_race_wins}</td>
                  <td>{row.driver_total_points}</td>
                  <td>
                    <button
                      className="mama"
                      onClick={() => updateDriverChampionship(row.dc_id)}
                    >
                      Update
                    </button>
                    <button
                      className="mama"
                      onClick={() => deleteDriverChampionship(row.dc_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Display Race Results Data */}
        <div className="table-container">
          <h2 className="table-h2">Race Results Data</h2>
          <table>
            <thead>
              <tr>
                <th>ResultId</th>
                <th>ID</th>
                <th>Positions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {raceResults.map((row) => (
                <tr key={row.res_id}>
                  <td>{row.res_id}</td>
                  <td>{row.d_id}</td>
                  <td>{row.driver_as_per_position}</td>
                  <td>
                    <button
                      className="mama"
                      onClick={() => updateRaceResults(row.res_id)}
                    >
                      Update
                    </button>
                    <button
                      className="mama"
                      onClick={() => deleteRaceResults(row.res_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableSlider>
    </div>
  );
}

export default AppRouter;
