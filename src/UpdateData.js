import React, { useState } from 'react';
import axios from 'axios';

const UpdateData = () => {
  const [teamName, setTeamName] = useState('');
  const [updateData, setUpdateData] = useState({
    gamesPlayed: 0,
    win: 0,
    draw: 0,
    loss: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    year: '',
  });

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/football/update/${teamName}`, updateData);
      console.log('Update response:', response.data);
      alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="team"
        placeholder="Team Name"
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
