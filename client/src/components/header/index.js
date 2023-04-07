import React from 'react';
import AppNavBar from '../AppNavBar/Navbar'
import { Link } from 'react-router-dom';
import './header.css';
// import 'site logo' from "file path"


const Header = () => {
  return (
    <div>
    <header class="navbar">
      <div class="tabs" className="">
        <Link class="title" to="/">
          <h1 className="">Programmer's ToolKit</h1>
        </Link>
      </div>
      <AppNavBar />
    </header>

    </div>
  );
};

export default Header;
