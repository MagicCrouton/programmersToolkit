import React, { useState }  from 'react';

import { QUERY_PROJECTMAIN } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import { EDIT_PROJECT, SAVE_PROJECT } from '../../utils/mutations';
// import react-syntax
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Form, Button} from 'react-bootstrap';


const ProjectMain = ({}) => {
    const {loading, data} = useQuery(QUERY_SINGLE_PROJECT, {
      variables: {
        projectId: `${localStorage.getItem('singleProjectView')}`
      }
    }); 
    const projectData = data?.project || {}

    //    ADDING EDIT BUTTON

    const [currentCode, setCurrentCode] = useState({currentCode: ''});
    const [prompt, setPrompt] = useState({prompt: ''});
    const [editProject] = useMutation(EDIT_PROJECT)

    const handleEdit = async (projectId) => {
      await editProject({
        variables: {
          projectId: projectId,
          currentCode: currentCode.currentCode,
          prompt: prompt.prompt
        }
      })
    }
    const handlePromptChange = (event) => {
      setPrompt(event.target.value);
    };
    // console.log(data.project.iterations[0].block)
    if (loading) {
        return <h3>Still Loading, please wait</h3>;

}
// return (
//   <div>
//     <h3 className="text-primary">View/Edit Your Project</h3>
//     <div className="flex-row justify-space-between my-4">
//       <p>{`${data.project.iterations[0].block}`}</p>
//     {/* {projectData.iterations.map((CodeBlock) => (
//         <div key={CodeBlock._id} className="col-12 col-xl-6">
//           <div className="card mb-3">
//             <h4 className="card-header bg-dark text-light p-2 m-0">
//               {CodeBlock._id} <br />
//             </h4>
//             <div className="card-body bg-light p-2">
//               <CodeBlock block={CodeBlock.block} />
//             </div>
//           </div>
//         </div>
//       ))} */}
//     </div>
//   </div>
// );

//       }
// export default ProjectMain;
return (
  <div>
    <h3 className="text-primary">View/Edit Your Project</h3>
    <div className="flex-row justify-space-between my-4">
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {data.project.iterations[0].block}
      </SyntaxHighlighter>
      
    </div>
    <div>
    <Form.Group>
          <Form.Label htmlFor='prompt'>What Would You Like to Edit?</Form.Label>
          <Form.Control
            type='text'
            placeholder='add/edit your code'
            name='prompt'
            onChange={handlePromptChange}
            value={prompt.prompt}
            required
          />
          
        </Form.Group>
        <br></br>
      {/* <button onClick={handleEdit}>Edit Project</button> */}
      <button onClick={() => handleEdit(projectData._Id)}>Edit Project</button>

    </div>
    
  </div>
  
);
};

export default ProjectMain;

