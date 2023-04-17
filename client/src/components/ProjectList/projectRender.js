
import React from 'react';


function ProjectRender({userData, handleDelete, handleView}) {


  return (
    <div>
        {userData?.projects.map((project) => (
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
  );
};

export default ProjectRender;