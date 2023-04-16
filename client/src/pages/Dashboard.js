import React from 'react';
import './dashboard.css'
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME, QUERY_ME } from '../utils/queries';

import AuthServices from '../utils/auth';



const Dashboard = () => {
  const { loading: loadingMe, data: meData } = useQuery(GET_ME);
  const { loading: loadingProjects, data: projectsData } = useQuery(QUERY_ME);

  if (loadingMe || loadingProjects) {
    return <p>Loading...</p>;
  }

  const me = meData?.me;
  const projects = projectsData?.projects;


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
      <ul>
      {projects && projects.map((project) => (
  <li key={project._id}>{project.projectName}</li>
))}

      </ul>
    </div>
  );
};
export default Dashboard;
