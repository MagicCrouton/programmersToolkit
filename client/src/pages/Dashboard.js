import React from 'react';
import AuthServices from '../utils/auth';

import './dashboard.css'
import ProjectList from '../components/ProjectList';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, QUERY_ME } from '../utils/queries';




const Dashboard = () => {

  const [currentPage, setCurrentPage] = useState('ViewProjects');
  const handlePageChange = (page) => setCurrentPage(page);
  const renderPage = () => {
    if (currentPage === 'ViewProjects') {
      return <Home handlePageChange={handlePageChange} />;
    }
    if (currentPage === 'CreateNewProject') {
      return <About />;
    }
    if (currentPage === 'Portfolio') {
      return <Portfolio />;
    }
    if (currentPage === 'Resume') {
      return <Resume />;
    }
    return <Contact />; 
  };

  return (
    <div>
        <h1>Welcome back, {AuthServices.getProfile().data.username}!</h1>
        <button onClick={() => {window.location.assign('/projectList')} }>
           View/Edit Your Projects
        </button>
        <br></br>
        <br></br>
        <button onClick={() => {window.location.assign('/newproject')} }>
           Create a New Project
        </button>
        <ProjectList />
    </div>
  );
};
export default Dashboard;
