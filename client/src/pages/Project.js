import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_PROJECT } from '../utils/mutations';
// import {newCode, editCode} from '../utils/API'


const NewProjectForm = () => {
  const [formState, setFormState] = useState({
    projectName: '',
    projectDescription: '',
    initialCode: '',
  });
  const [characterCount, setCharacterCount] = useState(0);

  // Set up our mutation with an option to handle errors
  const [newProject, { error }] = useMutation(NEW_PROJECT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const initialCode = formState.initialCode
    const projectName = formState.projectName
    const projectDescription = formState.projectDescription
    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    try {
      const { data } = newProject({
        variables: {
          initialCode,
          projectName,
          projectDescription
         },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      <h3>Lets Start a New Project</h3>

      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <input
            name="projectName"
            placeholder="What will you call your project?"
            value={formState.projectName}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="projectDescription"
            placeholder="Describe Your project"
            value={formState.projectDescription}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <textarea
            name="initialCode"
            placeholder="What would you like me to make?"
            value={formState.initialCode}
            className="form-input w-100"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Start a New Project
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default NewProjectForm;