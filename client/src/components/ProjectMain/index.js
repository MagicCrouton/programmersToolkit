import React, { useEffect, useState }  from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import { EDIT_PROJECT, SAVE_PROJECT } from '../../utils/mutations';
// import react-syntax
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { Form } from 'react-bootstrap';
import timestamp from 'unix-timestamp'


function ProjectMain({handlePageChange}) {
  
    const {loading, data} = useQuery(QUERY_SINGLE_PROJECT, {
      variables: {
        projectId: `${localStorage.getItem('singleProjectView')}`
      }
    })

    // setCurrentCode(data.project.iterations[projectData.iterations.length - 1].block)
    const projectData = data?.project || {}

    const [prompt, setPrompt] = useState('');
    const [editProject] = useMutation(EDIT_PROJECT);
    const [saveProject] = useMutation(SAVE_PROJECT);
    const [currentCode, setCurrentCode] = useState(``);
    const [promptLabel, setPromptLabel] = useState('enter what you want to change with this code');
    const [firstLoad, setLoad] = useState(true);

  

    const updateCode = (code) => {
      setLoad(false);
      setCurrentCode(code);
    }
    const handlePromptChange = (event) => {
      if (firstLoad === true) {
        setCurrentCode(data.project.iterations[projectData.iterations.length - 1].block)
        setLoad(false)
      }
      setPrompt(event.target.value);
    };

    const handleEdit = async (id) => {
      let button = document.getElementById(`${id}`);
      button.innerHTML = '<i class="fa fa-spinner fa-spin-2x"></i> Loading...';
      button.disabled = true;
      button.onclick = null;
      await editProject({
        variables: {
          projectId: projectData._id,
          currentCode: currentCode,
          prompt: prompt
        }
      })
      handlePageChange('')
      handlePageChange('SingleProjectView')
    }

    
    const handleSave = async () => {
      await saveProject({
        variables: {
          blockId: projectData.iterations[projectData.iterations.length - 1]._id,
          currentCode: currentCode,
        }
      })
      handlePageChange('')
      handlePageChange('SingleProjectView')
    }

    if (loading) { return <h3>Still Loading, please wait</h3> }


return (
  <div className='d-flex flex-row'>
  <div className='col-1'></div>
  <div className='col-8'>
    <h3 className="text-primary">View/Edit Your Project</h3>
    <br></br>
    <Editor 
            value= {firstLoad === true ? data.project.iterations[projectData.iterations.length - 1].block : currentCode}
            onValueChange={code => updateCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              materialOceanic,
            }}
     />
    <div>
      <br></br>
    <Form.Group className='d-flex flex-column justify-content-center'>
          <Form.Label htmlFor='prompt'>{promptLabel}</Form.Label>
          <Form.Control
            type='text'
            placeholder='do it'
            name='prompt'
            onChange={handlePromptChange}
            value={prompt}
            required
          />
          
        </Form.Group>
        <br></br>
      {/* <button onClick={handleEdit}>Edit Project</button> */}
      <div className='flex-row justify-content-evenly'>
      <div>
      <button id='iterateButton' onClick={() => handleEdit(`iterateButton`)}>Iterate</button>
      <button id='saveButton' onClick={() => handleSave('saveButton')}>Save</button>
      </div>
    </div>
    </div>
  </div>
  <div className='col-1'></div>
  <div className="col-2 h-50 d-inline-block">
    <h6>previous Iterations</h6>
    <br></br>
{projectData.iterations.map((iteration) => (
        <div key={iteration._id} className="col-sm-4">
            <button style={{materialOceanic, fontSize: 10}} onClick={() => updateCode(iteration.block)}>
              <span>{iteration.instruction}{iteration._id},</span>
              <br></br><br></br>
              <span>Created: {`${timestamp.toDate(Math.floor(iteration.createdAt)/1000)}`}</span>
            </button>
        </div>
))}
    </div>

</div>
  
);
};

export default ProjectMain;

