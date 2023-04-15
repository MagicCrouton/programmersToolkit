import React, { useState }  from 'react';

import { QUERY_PROJECTMAIN } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import { EDIT_PROJECT, SAVE_PROJECT } from '../../utils/mutations';
// import react-syntax
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

import { Form, Button} from 'react-bootstrap';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


const ProjectMain = ({}) => {
  
    const {loading, data} = useQuery(QUERY_SINGLE_PROJECT, {
      variables: {
        projectId: `${localStorage.getItem('singleProjectView')}`
      }
    })

    // setCurrentCode(data.project.iterations[projectData.iterations.length - 1].block)
    const projectData = data?.project || {}
    const [prompt, setPrompt] = useState({prompt: ''});
    const [editProject] = useMutation(EDIT_PROJECT);
    const [currentCode, setCurrentCode] = useState(``);
    const [firstLoad, setLoad] = useState(true)

    const updateCode = (code) => {
      setLoad(false);
      setCurrentCode(code);
    }
    const handlePromptChange = (event) => {
      setPrompt(event.target.value);
    };
    // console.log(data.project.iterations[0].block)

    const handleEdit = async () => {
      await editProject({
        variables: {
          projectId: data.project._id,
          currentCode: currentCode,
          prompt: prompt
        }
      })
      window.location.reload();
    }
// setCurrentCode(projectData.iterations[projectData.iterations.length - 1].block);

    if (loading) { return <h3>Still Loading, please wait</h3> }


return (
  <div>
    <h3 className="text-primary">View/Edit Your Project</h3>
    <Editor
            value= {firstLoad === true ? data.project.iterations[projectData.iterations.length - 1].block : currentCode}
            onValueChange={code => updateCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12
            }}
     />
    <div>
    <Form.Group className='d-flex flex-column'>
          <Form.Label htmlFor='prompt'>What would you like changed?</Form.Label>
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
      <button onClick={() => handleEdit(data)}>Iterate</button>

    </div>
  <script src='./ProjectMain.js'></script>
  </div>
  
);
};

export default ProjectMain;

