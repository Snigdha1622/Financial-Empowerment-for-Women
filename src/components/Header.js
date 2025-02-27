// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Ensure you have appropriate styles

function Header() {
  return (
    <header className="blue-header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/budgeting">Budgeting</Link></li>
          <li><Link to="/expensetracker">Expense Tracker</Link></li>
          <li><Link to="/sipcalculator">SIP Calculator</Link></li>
          <li><Link to="/financialplanning">Financial Planning</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
