import React, { useState } from 'react';
import axios from 'axios';

const DeleteData = () => {
  const [team, setTeam] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/football/delete/${team}`);
      alert(response.data.message);
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Failed to delete data.');
    }
  };

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Delete Team Data</h2>
        <form onSubmit={handleDelete}>
        <input
            type="text"
            placeholder="Enter Team Name"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
        />
      <button onClick={handleDelete}>Delete Team</button>
    </form>
    </div>
  );
};

export default DeleteData;
