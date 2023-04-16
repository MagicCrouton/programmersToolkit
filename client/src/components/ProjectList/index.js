import './ProjectList.css';

import React from 'react';
import { QUERY_ME, QUERY_PROJECTMAIN } from '../../utils/queries';
import { FIND_SINGLE_PROJECT, REMOVE_PROJECT } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

function ProjectList({handlePageChange}) {

    const {loading, data} = useQuery(QUERY_ME);
    // const {loadingView, viewdata} = useQuery(QUERY_PROJECTMAIN);
    // const [viewProject] = useMutation(FIND_SINGLE_PROJECT)
    const userData = data?.me || {}

    const [removeProject] = useMutation(REMOVE_PROJECT)
    
    const handleDelete = async (projectId) => {
        await removeProject({
            variables: {
                projectId: projectId
            }
        })

      handlePageChange('ViewProjects');
    }

    const handleView = async (projectId) => {
      window.localStorage.setItem('singleProjectView', projectId)
      handlePageChange('SingleProjectView')
    }

  if (loading) {
    return <h3>Still Loading, please wait</h3>;
  }

  return (
    <div className="projectlist-content">
      <div>
        <h3 className="text-primary">Your Projects</h3>
      </div>
      <div id="projects" className="flex-row justify-space-between my-4">
        {userData.projects.map((project) => (
            <div key={project._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {project.projectName} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    Project Description: {project.projectDescription ? project.projectDescription : 0}{' '}
                   
                    {project.projectDescription && project.projectDescription === 1 ? '' : ''}
                  </span>
                </h4>
                <div className="card-body bg-light p-2">
              <p>{project.initialCode}</p>
              <button onClick={() => {handleDelete(project._id)} }>
                Delete
              </button>
              <button onClick={() => {handleView(project._id)}  }>
                                    View Project
              </button>
            </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectList;