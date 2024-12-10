import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Football Data</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Add Data</Link></li>
        <li><Link to="/update">Update Data</Link></li>
        <li><Link to="/delete">Delete Data</Link></li>
        <li><Link to="/display">Display Data</Link></li>
        <li><Link to="/summary">Summary</Link></li>
        <li><Link to="/wins">Top Teams</Link></li>
        <li><Link to="/average-goals">Average Goals</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
