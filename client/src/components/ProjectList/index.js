import './ProjectList.css';

import React from 'react';
import ProjectRender from './projectRender';
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
    <ProjectRender userData={userData} handleDelete={handleDelete} handleView={handleView} />
      </div>
    </div>
  );
};

export default ProjectList;