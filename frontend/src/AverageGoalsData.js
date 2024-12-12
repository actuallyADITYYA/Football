// FootballQuery.js
import React, { useState } from 'react';
import axios from 'axios';

const FootballQuery = () => {
    const [year, setYear] = useState('');
    const [avgGoals, setAvgGoals] = useState('');
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState('');

    const handleQuery = async () => {
        try {
            setError('');
            const response = await axios.get('http://localhost:4000/api/football/average-goals', {
                params: { year, avgGoals },
            });
            setTeams(response.data);
        } catch (err) {
            setTeams([]);
            setError(err.response?.data?.message || 'Error fetching data');
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Football Team Average Goal</h2>
            <div style={{textAlign: 'center', marginBottom: '10px' }}>
                <label>Average Goals: </label>
                <input
                    type="number"
                    step="0.1"
                    value={avgGoals}
                    onChange={(e) => setAvgGoals(e.target.value)}
                    placeholder="Enter average goals"
                />
            </div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <label>Year: </label>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter year"
                />
            </div>
            <button onClick={handleQuery} style={{ textAlign: 'center', margin: '0 40% 0 48%' }}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {teams.length > 0 && (
                <table style={{ textAlign: 'left' }}>
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
                            <th>Average Goals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={index}>
                                <td>{team.team}</td>
                                <td>{team.gamesPlayed}</td>
                                <td>{team.win}</td>
                                <td>{team.draw}</td>
                                <td>{team.loss}</td>
                                <td>{team.goalsFor}</td>
                                <td>{team.goalsAgainst}</td>
                                <td>{team.points}</td>
                                <td>{team.year}</td>
                                <td>{team.avgGoals.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FootballQuery;
