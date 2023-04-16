import React, { useState }  from 'react';
import Bootstrap from 'bootstrap'

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
import { Form, Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';


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
    const [currentBlock, setCurrentBlock] = useState(0);
    const [firstLoad, setLoad] = useState(true);
    const [codeSet, setCodeSet] = [{codeArray: [], codeLength: 0}]

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
      console.log(prompt)
      console.log(currentCode)
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
  <div className='col-10'>
    <h3 className="text-primary">View/Edit Your Project</h3>
    <Editor id='test'
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
      {/* <div className='col-9 d-flex'>
      <button className={currentBlock >= (data.project.iterations.length) ? 'd-none' : 'btn-primary'} onClick={() => handleBlockNav(+1)}>back</button>
      <button className={currentBlock <= 0 ? 'd-none' : 'btn-primary'} onClick={() => handleBlockNav(-1)}>forward</button>
      </div> */}
    </div>
    </div>
  <script src='./ProjectMain.js'></script>
  </div>


  <div className="card col-2 overflow-auto">
  <ul className="list-group">
    <header>iterations</header>
    <br></br>
    <li className="list-group-item">An item</li>
    <li className="list-group-item">A second item</li>
    <li className="list-group-item">A third item</li>
  </ul>
</div>
</div>
  
);
};

export default ProjectMain;

