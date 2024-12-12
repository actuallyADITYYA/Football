import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayData = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/football');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <h2 style={{textAlign: 'center'}}>Team Data</h2>
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
    </div>
  );
};

export default DisplayData;
