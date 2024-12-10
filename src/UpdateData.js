import React, { useState } from "react";
import axios from "axios";

const UpdateData = () => {
  const [updateData, setUpdateData] = useState({
    team: "",
    gamesPlayed: 0,
    win: 0,
    draw: 0,
    loss: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    year: 23,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: name === "team" ? value : parseInt(value),
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { team, ...data } = updateData;

      if (!team) {
        alert("Team name is required to update data!");
        return;
      }

      const response = await axios.put(
        `http://localhost:4000/api/football/update/${team}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response.data);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        name="team"
        placeholder="Team Name (to update)"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="gamesPlayed"
        placeholder="Games Played"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="win"
        placeholder="Win"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="draw"
        placeholder="Draw"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="loss"
        placeholder="Loss"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="goalsFor"
        placeholder="Goals For"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="goalsAgainst"
        placeholder="Goals Against"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="points"
        placeholder="Points"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        onChange={handleChange}
        required
      />

      <button type="submit">Update Data</button>
    </form>
  );
};

export default UpdateData;
