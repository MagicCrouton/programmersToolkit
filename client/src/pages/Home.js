import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import LoginForm from '../components/Login';
import SignupForm from '../components/Signup';
import Dashboard from '../components/Dashboard';
import { GET_ME } from '../utils/queries';
import AuthServices from '../utils/auth';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


// const renderPage = () => {
//   const isLoggedIn = AuthServices.loggedIn();
  
//   if (isLoggedIn) {
//     return <Dashboard />
//   }
//   else {
//     return <LoginForm />
//   }
// };

const Home = () => {
  const { userData } = useQuery(GET_ME);
  return (
    <main >
      <h1> Hello, How can We Help with ?</h1>
        <Card>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
            <Card.Body>
            
              <Card.Text>
              Please Login/Sign Up for access your Project
              </Card.Text>
              <Link to="/login">
              <Button variant="primary">Login Here</Button>
      </Link>
            </Card.Body>
          </Card>
        
      
    </main>
  );
};

export default Home;
