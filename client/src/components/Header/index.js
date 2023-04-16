import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
// import 'site logo' from "file path"


const Header = () => {
  return (
    <div>
    <header>
      <div id="tabs" class="sticky">
        <ul>
          <li id='title'>
            <h1>Programmer's ToolKit</h1>
          </li>
          <li id='login'>
          </li>
        </ul>
      </div>
      <div id="space"></div>
    </header>
    </div>
  );
};

export default Header;