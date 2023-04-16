import React from 'react';
import { useState } from 'react';
import AuthServices from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';



const Home = () => {

  console.log(AuthServices.loggedIn())
  const RenderButton = () => {
    if (AuthServices.loggedIn() === true) {
      return (
        <div>
        <Link to="/dashboard">
        <Button variant="primary">Go to Your Dashboard</Button>
        </Link>
        </div>
      )
    }  
    if (AuthServices.loggedIn() === false) {
      return (
        <div>
        <Card.Text>
        Please Login/Sign Up for access your Project
        </Card.Text>
        <Link to="/login">
        <Button variant="primary">Login/SignUp</Button>
        </Link>
        </div>
      )
    }
    else {
      return (
        <div>
        <Card.Text>
        Please Login/Sign Up for access your Project
        </Card.Text>
        <Link to="/login">
        <Button variant="primary">Login/SignUp</Button>
        </Link>
        </div>
      )    
    }      
  };

  const { userData } = useQuery(GET_ME);
  return (
    <main >
      <h1> Hello, How can We Help with ?</h1>
        <Card>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
            <Card.Body>
              <RenderButton />
            </Card.Body>
          </Card>
        
      
    </main>
  );
};

export default Home;
