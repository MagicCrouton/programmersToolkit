import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

// import { GET_ME } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(GET_ME);
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}>
          <LoginForm />
        </div>
        <div className="col-12 col-md-10 my-3">
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
