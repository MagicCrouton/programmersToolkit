import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_PROJECT } from '../../utils/mutations';
import { Form, Button} from 'react-bootstrap';
import AuthService from "../../utils/auth"
// import {newCode, editCode} from '../utils/API'
import './newProject.css'


const NewProjectForm = () => {
  const [formState, setFormState] = useState({projectName: '', projectDescription: '', initialCode: '',});

  // Set up our mutation with an option to handle errors
  const [newProject] = useMutation(NEW_PROJECT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(AuthService.getProfile().data)
    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
      // const { data } = 
      await newProject({
        variables: {
          projectName: formState.projectName,
          projectDescription: formState.projectDescription,
          initialCode: formState.initialCode
        }
      });
      // console.log(data)
      // window.location.reload();
      window.location.assign('/projectList');

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}

      <Form onSubmit={handleFormSubmit}>
      <div class="page-content">
        <div id="form-content">
        <h1>Lets Start Your New Project {AuthService.getProfile().data.username}</h1>
        
        <Form.Group>
          <Form.Label htmlFor='projectName'>Project Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='What is the Project Name?'
            name='projectName'
            onChange={handleChange}
            value={formState.projectName}
            required
          />
          <Form.Control.Feedback type='invalid'>ProjectName is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='projectDescription'>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Describe Your Project'
            name='projectDescription'
            onChange={handleChange}
            value={formState.projectDescription}
            required
          />
          <Form.Control.Feedback type='invalid'>Description is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='initialCode'>What can we start with?</Form.Label>
          <Form.Control
            type='text'
            placeholder='What would you like to do?'
            name='initialCode'
            onChange={handleChange}
            value={formState.initialCode}
            required
          />
          <Form.Control.Feedback type='invalid'>Starting prompt is required!</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <br></br>
        <Button
          disabled={!(formState.projectName && formState.projectDescription && formState.initialCode)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        {/* {error && <div>Sign up failed</div>} */}
        </div>
        </div>
      </Form>
    </>
  );
};

export default NewProjectForm;