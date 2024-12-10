import React, { useState } from 'react';
import axios from 'axios';

const SummaryData = () => {
  const [year, setYear] = useState('');
  const [summary, setSummary] = useState(null);

  const handleChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/football/summary/${year}`);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      alert('Failed to fetch summary data. Please try again.');
    }
  };

  return (
    <div className="summary-container">
  <h2>Summary Data</h2>
  <form onSubmit={handleSubmit}>
    <input
      type="number"
      name="year"
      placeholder="Enter Year"
      value={year}
      onChange={handleChange}
      required
    />
    <button type="submit">Get Summary</button>
  </form>
  {summary && (
    <div>
      <h3>Summary for {year}</h3>
      <p>Total Games Played: {summary.totalGamesPlayed}</p>
      <p>Total Wins: {summary.totalWins}</p>
      <p>Total Draws: {summary.totalDraws}</p>
    </div>
  )}
</div>

  );
};

export default SummaryData;
