import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, CardColumns, Row } from 'react-bootstrap';

import Auth from '../utils/auth';
// import { saveBook, searchGoogleBooks } from '../utils/API';
// import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import {SEARCH_CODE} from "../utils/mutations"


import {useQuery, useMutation} from '@apollo/client';
import { SAVE_PROJECT } from '../utils/mutations';

const ProjectSearch = () => {
  // create state for holding returned google api data
  const [projectSearch, setProjectSearch] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

//   create state to hold saved searchId values
  const [savedProjectIds, setSavedProjectIds] = useState([]);

  const [saveProject, {error}] = useMutation(SAVE_PROJECT );
  const [searchCode] = useMutation(SEARCH_CODE );


  
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

      // const response = await newCode(searchInput);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const newCode = async (payload) => {
      //   const response = await openai.createChatCompletion({
      //       model: "gpt-3.5-turbo",
      //       messages: [{role: "user", content: `${payload}`}],
      // });
      
      // return(response.data.choices[0].message.content)
      // console.log(response.data.choices[0].message.content)
    // }

    // setProjectSearch(newCode);
      setSearchInput('');
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
     
      const {data} = await saveProject({
        variables: { input: projectToSave }
      });

      
      setSavedProjectIds([...savedProjectIds, projectToSave.projectId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* < fluid className='text-light bg-dark'> */}
      <Container>
          <h1>How can we help with your Project?</h1>
          <Form onSubmit={handleFormSubmit}>
          <Row>
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

      {/* <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container> */}
    </>
  );
};

export default ProjectSearch;