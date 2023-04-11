import React from 'react';
// import { QUERY_ME } from '../../utils/queries';
import { REMOVE_PROJECT } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { PROJECT_MAIN } from '../../utils/queries';

const ProjectMain = ({ }) => {

    const {loading, data} = useQuery(PROJECT_MAIN);

    const projectData = data?.project || {}

    // const [removeProject] = useMutation(REMOVE_PROJECT)
    const handleClick = async (ProjectList) => {
        await ProjectMain ({
            variables: {
                projectId: projectId
            }
        })

      window.location.assign('/projectMain');

    }

  if (loading) {
    return <h3>Still Loading, please wait</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">Your Project</h3>
      <div className="flex-row justify-space-between my-4">
        {projectData?.projects.map((projectMain) => (
            <div key={projectMain._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {projectMain.projectName} <br />
                  {/* <span className="text-white" style={{ fontSize: '1rem' }}>
                    Project Description: {project.projectDescription ? project.projectDescription : 0}{' '}
                   
                    {project.projectDescription && project.projectDescription === 1 ? '' : ''}
                  </span> */}
                </h4>
                <div className="card-body bg-light p-2">
              <p>{projectMain.iterations}</p>
              <button onClick={() => {handleDelete(projectMain._id)} }>
                Delete
              </button>
            </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectMain;
