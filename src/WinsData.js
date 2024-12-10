import React, { useState } from 'react';
import axios from 'axios';

const WinsData = () => {
  const [winCount, setWinCount] = useState('');
  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    setWinCount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/football/wins/${winCount}`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
    }
  };

  return (
    <div>
      <h2>Top Teams by the Number of Wins</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="winCount"
          placeholder="Enter Minimum Wins"
          value={winCount}
          onChange={handleChange}
          required
        />
        <button type="submit">Fetch Teams</button>
      </form>
      {records.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Team</th>
              <th>Games Played</th>
              <th>Win</th>
              <th>Draw</th>
              <th>Loss</th>
              <th>Goals For</th>
              <th>Goals Against</th>
              <th>Points</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.team}</td>
                <td>{record.gamesPlayed}</td>
                <td>{record.win}</td>
                <td>{record.draw}</td>
                <td>{record.loss}</td>
                <td>{record.goalsFor}</td>
                <td>{record.goalsAgainst}</td>
                <td>{record.points}</td>
                <td>{record.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WinsData;
