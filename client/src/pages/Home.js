import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Dashboard from '../components/Dashboard';
import { GET_ME } from '../utils/queries';
import AuthServices from '../utils/auth'

const renderPage = () => {
  const isLoggedIn = AuthServices.loggedIn();
  
  if (isLoggedIn) {
    return <Dashboard />
  }
  else {
    return <LoginForm />
  }
};

const Home = () => {
  const { userData } = useQuery(GET_ME);
  return (
    <main>
      <div>{`${userData}`}</div>
      {/* <div>{`${AuthServices.loggedIn()}`}</div> */}
      <div className="flex-row justify-center">
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
      </div>
    </main>
  );
};

export default Home;
