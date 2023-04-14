import React from 'react';

import { QUERY_PROJECTMAIN } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';

const ProjectMain = ({}) => {
    const {loading, data} = useQuery(QUERY_SINGLE_PROJECT, {
      variables: {
        projectId: `${localStorage.getItem('singleProjectView')}`
      }
    }); 
    const projectData = data?.project || {}
    // console.log(data.project.iterations[0].block)
    if (loading) {
        return <h3>Still Loading, please wait</h3>;

}
return (
  <div>
    <h3 className="text-primary">View/Edit Your Project</h3>
    <div className="flex-row justify-space-between my-4">
      <p>{`${data.project.iterations[0].block}`}</p>
    {/* {projectData.iterations.map((CodeBlock) => (
        <div key={CodeBlock._id} className="col-12 col-xl-6">
          <div className="card mb-3">
            <h4 className="card-header bg-dark text-light p-2 m-0">
              {CodeBlock._id} <br />
            </h4>
            <div className="card-body bg-light p-2">
              <CodeBlock block={CodeBlock.block} />
            </div>
          </div>
        </div>
      ))} */}
    </div>
  </div>
);

      }
export default ProjectMain;


