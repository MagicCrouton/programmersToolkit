import React from 'react';
import Navbar from '../Navbar'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link className="text-light" to="/">
          <h1 className="m-0">Programmer's ToolKit</h1>
        </Link>
      </div>
      <Navbar />
    </header>

    </div>
  );
};

export default Header;
