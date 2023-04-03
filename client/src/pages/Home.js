import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
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
        
      {/* <div>{`${userData}`}</div> */}
      {/* <div>{`${AuthServices.loggedIn()}`}</div> */}
     {/* <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}>
          <LoginForm />
        </div>
        <div className="col-12 col-md-10 my-3 p-3"
             style={{ border: '1px dotted #1a1a1a' }}>
            <SignupForm
              // profiles={profiles}
              title="Please sign up to access your tool kit.."
            /> 
        </div>
      </div> */}
    </main>
  );
};

export default Home;
