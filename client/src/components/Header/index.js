import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
// import 'site logo' from "file path"


const Header = () => {
  return (
    <div>
    <header>
    <div id='title'>
            <h1>Programmer's ToolKit</h1>
          </div>
      <div id="tabs">
        <ul>
          <li id='home'>
          <Link to="/dashboard">
            Dashboard
          </Link>
          </li>
        </ul>
      </div>
      <div id="space"></div>
    </header>
    </div>
  );
};

export default Header;