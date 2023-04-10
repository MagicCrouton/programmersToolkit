import React from 'react';
import '../components/Dashboard/dashboard.css'
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import LoginForm from '../components/Login';
import SignupForm from '../components/Signup';
import { GET_ME } from '../utils/queries';
import AuthServices from '../utils/auth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
return (
    <div>
  <div id="mySidenav" className="sidenav">
  <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">&times;</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
</div>
    </div>
)
}

export default Dashboard;