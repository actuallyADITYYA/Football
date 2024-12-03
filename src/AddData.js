import React, { useState } from 'react';
import axios from 'axios';

const AddData = () => {
  const [formData, setFormData] = useState({
    team: '',
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
    if(e.target.name === 'gamesPlayed' || e.target.name === 'win' || e.target.name === 'draw' || e.target.name === 'loss' || e.target.name === 'goalsFor' || e.target.name === 'goalsAgainst' || e.target.name === 'points' || e.target.name === 'year'){
        setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
    }else{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
  };



    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Form data:', formData);
        const response = await axios.post('http://localhost:4000/api/football/add',formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        } );
        console.log('Response from server:', response.data);
        alert('Data added successfully!');
    } catch (error) {
        console.error('Error adding data:', error);
        alert('Failed to add data');
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

      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddData;
