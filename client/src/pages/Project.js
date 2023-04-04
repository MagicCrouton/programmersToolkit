import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, CardColumns, Row } from 'react-bootstrap';

import Auth from '../utils/auth';

import {SEARCH_CODE} from "../utils/mutations"
// import { newCode, editCode } from "../utils/API";

import {useQuery, useMutation, gql} from '@apollo/client';
import { SAVE_PROJECT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import openai from 'openai';



// const { data } = useQuery(GET_ME);
// const meData = data;

const ProjectSearch = () => {
  // create state for holding returned google api data
  const [projectSearch, setProjectSearch] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

//   create state to hold saved searchId values
  const [savedProjectIds, setSavedProjectIds] = useState([]);

  const [saveProject, {error}] = useMutation(SAVE_PROJECT );
  const [searchCode] = useMutation(SEARCH_CODE );
  const [projectNameInput, setProjectNameInput] = useState('');
  const [projectDescription, setProjectDescription] = useState('')


  
  // useEffect(() => {
  //   return () => savedProjectIds(savedProjectIds);
  // });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const { loading, error, data } = await searchCode({
        variables: {
          code: searchInput
        }
      });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data.searchCode)

      
      setSearchInput('searchInput');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a project data to our database
  const handleSaveProject = async (projectId) => {
    // find the book in `searchedBooks` state by the matching id
    const projectToSave = projectSearch.find((project) => project.projectId === projectId);

 

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     
      const response = await saveProject(projectToSave, token);

    if (!response.ok) {
      throw new Error('something went wrong!');
    }

    // update the `savedProjectIds` state with the new project's id
    setSavedProjectIds([...savedProjectIds, projectId]);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <>
      {/* < fluid className='text-light bg-dark'> */}
      <Container>
      {/* <h2 className="card-header">
        {data?.User ? `${data.User.username}'s` : meData?.me?.username ? `${meData.me.username}'s` : 'Your'} friends have endorsed these skills...
      </h2> */}
          <h1>New Project Page</h1>
          <Form onSubmit={handleFormSubmit}>
          <Row>
              <Col xs={12} md={4}>
            <Form.Control
              name='projectNameInput'
              value={projectNameInput}
              onChange={(e) => setProjectNameInput(e.value)}
              type='text'
              size='lg'
              placeholder='Enter your project name'
            />
               </Col>
               <Col xs={12} md={4}>
            <Form.Control
              name='projectDescription'
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.value)}
              type='text'
              size='lg'
              placeholder='Describe your project'
            />
          </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for codes'
                />
              </Col>
             
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      {/* </Jumbotron> */}

      <Container>
  <h2>
    {projectSearch.length
      ? `Viewing ${projectSearch.length} results:`
      : 'Your search result below'}
  </h2>
  
    {projectSearch.map((project) => {
      return (
        // Render each project as a Card component
        <Card key={project.id}>
          <Card.Body>
            <Card.Title>{project.name}</Card.Title>
            <Card.Text>{project.description}</Card.Text>
          </Card.Body>
        </Card>
      );
    })}
    {/* {Auth.loggedIn() && (
      <Button
        disabled={savedProjectIds?.some((savedProjectId) => savedProjectId === project.projectId)}
        className='btn-block btn-info'
        onClick={() => handleSaveProject(project.projectId)}
      >
        {savedProjectIds?.some((savedProjectId) => savedProjectId === project.projectId)
          ? 'This project has already been saved!'
          : 'Save this project!'}
      </Button>
    )} */}
  {/* </CardColumns> */}
</Container>

    </>
  );
};

export default ProjectSearch;