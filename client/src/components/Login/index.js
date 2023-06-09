import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// import { redirect } from 'react-router-dom';
import './login.css';
// import { loginUser } from '../utils/API';
import Auth from '../../utils/auth';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //code brought in after
  const[loginUser, {error}] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // alert("hello")
      const { data } = await loginUser({
        variables: { ...userFormData}
      });

      Auth.login(data.login.token)
      
      // return redirect("/project")


    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} id="loginForm">
      <h2>Log In</h2>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <br></br>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='warning'>
          Submit
        </Button>
        <Link to="/signup">
              <Button variant="primary">Signup</Button>
        </Link>
      </Form>
      {error && <div>Login failed</div>}
    </>
  );
};

export default LoginForm;