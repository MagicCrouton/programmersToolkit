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



const Dashboard = () => {

  const [currentPage, setCurrentPage] = useState('ViewProjects');
  const handlePageChange = (page) => setCurrentPage(page);
  const renderPage = () => {
    if (currentPage === 'ViewProjects') {
      return <ProjectList />;
    }
    if (currentPage === 'CreateNewProject') {
      return <NewProjectForm />;
    }
  };

  return (
    <div>
        <h1>Welcome back, {AuthServices.getProfile().data.username}!</h1>
        <br></br>
        <br></br>
        <div className='d-flex flex-row'>
          <div className='col-2'>
        <AppNavBar />
          </div>
          <div className='col-10'>
        {renderPage()}
          </div>
        </div>
    </div>
  );
};
export default Dashboard;
