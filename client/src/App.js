import React from 'react';
//***createHttplink needed to add token to header and capture from local storage
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// needed for need to import setContext for authLink
import { setContext } from '@apollo/client/link/context'

import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import NewProjectForm from './components/NewProjectForm';
import ProjectList from './components/ProjectList';
import ProjectMain from './components/ProjectMain'
import Dashboard from './pages/Dashboard';


// ***Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});


// ***Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // ***get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // ***return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // uri: '/graphql',
  // ***httpLink needed for header decode to work
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-vh-100">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />  
               <Route 
                path="/dashboard" 
                element={<Dashboard />} 
              />    
               <Route 
                path="/signup" 
                element={<SignupForm />} 
              />    
              <Route 
                path="/login" 
                element={<LoginForm />} 
              />
              <Route 
                path="/newproject" 
                element={<NewProjectForm />} 
              />    
              <Route 
                path="/projectList" 
                element={<ProjectList />} 
              />    
              <Route 
                path="/projectMain" 
                element={<ProjectMain />} 
              />    
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;