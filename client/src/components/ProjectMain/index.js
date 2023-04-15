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
    const [displayCode, setDisplayCode] = useState({});
    const [editProject] = useMutation(EDIT_PROJECT)

    const handleEdit = async () => {
      console.log(data.project.iterations)
      console.log(prompt)
      await editProject({
        variables: {
          projectId: data.project._id,
          currentCode: data.project.iterations[0].block,
          prompt: prompt
        }
      })
      window.location.reload();
    }
    const handlePromptChange = (event) => {
      setPrompt(event.target.value);
    };
    // console.log(data.project.iterations[0].block)
    if (loading) {
        return <h3>Still Loading, please wait</h3>;

}

return (
  <div>
    <h3 className="text-primary">View/Edit Your Project</h3>
    <div>
          <div className="flex-row justify-space-between my-4">
          <SyntaxHighlighter language="javascript" style={materialOceanic}>
            {projectData.iterations[projectData.iterations.length - 1].block}
          </SyntaxHighlighter>
        </div>
    </div>
    <div>
    <Form.Group>
          {/* <Form.Label htmlFor='prompt'>Current Iteration</Form.Label>
          <Form.Control
            type='text'
            placeholder= {data.project.iterations[0].block}
            name='currentCode'
            onChange={handlePromptChange}
            value={currentCode.currentCode}
            required
          /> */}
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
      <button onClick={() => handleEdit(data)}>Edit Project</button>

    </div>
    
  </div>
  
);
};

export default ProjectMain;

