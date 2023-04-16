import React, { useState }  from 'react';
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


const ProjectMain = ({}) => {
  
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
    const [firstLoad, setLoad] = useState(true);

    // loads blocks into memory

    // let iterationSet = projectData.iterations;
    // codeSet.codeLength = iterationSet.length;
    // for (let i=0; i < codeSet.codeLength; i++) {
    //   codeSet.codeArray[i] = iterationSet[i].block
    // }

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

    const handleEdit = async () => {
      await editProject({
        variables: {
          projectId: data.project._id,
          currentCode: currentCode,
          prompt: prompt
        }
      })
      // console.log(prompt)
      // console.log(currentCode)
      window.location.reload();
    }

    // const handleBlockNav = async (n) => {
    //   setCurrentBlock(currentBlock + n)
    //   setCurrentCode(codeSet[(codeSet.codeLength-1) - n])
    //   console.log(currentCode)
    // } 
    
    const handleSave = async () => {
      await saveProject({
        variables: {
          blockId: projectData.iterations[projectData.iterations.length - 1]._id,
          currentCode: currentCode,
        }
      })
      window.location.reload();
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
          <Form.Label htmlFor='prompt'>What would you like changed?</Form.Label>
          <Form.Control
            type='text'
            placeholder='type what you want changed'
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
      <button onClick={() => handleEdit(data)}>Iterate</button>
      <button onClick={() => handleSave(data)}>Save</button>
      </div>
    </div>
    </div>
  </div>
  <div className='col-1'></div>
  <div className="col-2 h-50 d-inline-block overflow-auto">
    <h6 className='d-flex justify-content-center'>previous Iterations</h6>
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

