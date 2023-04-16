import React from 'react';
import AuthServices from '../utils/auth';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, QUERY_ME } from '../utils/queries';

import './dashboard.css'
import NewProjectForm from '../components/NewProjectForm';
import ProjectList from '../components/ProjectList';
import ProjectMain from '../components/ProjectMain';
import AppNavBar from '../components/AppNavBar/Navbar';



function Dashboard() {

  const [currentPage, setCurrentPage] = useState('ViewProjects');
  const handlePageChange = (page) => setCurrentPage(page);
  const renderPage = () => {
    if (currentPage === 'ViewProjects') {
      return <ProjectList handlePageChange={handlePageChange} />;
    }
    if (currentPage === 'CreateNewProject') {
      return <NewProjectForm handlePageChange={handlePageChange} />;
    }
    if (currentPage === 'SingleProjectView') {
      return <ProjectMain handlePageChange={handlePageChange} />;
    }
  };

  return (
    <div>
        <h1>Welcome back, {AuthServices.getProfile().data.username}!</h1>
        <br></br>
        <br></br>
        <div className='d-flex flex-row'>
          <div className='col-2'>
        <AppNavBar currentPage = {currentPage} handlePageChange={handlePageChange} />
          </div>
          <div className='col-10'>
        {renderPage()}
          </div>
        </div>
    </div>
  );
};
export default Dashboard;
