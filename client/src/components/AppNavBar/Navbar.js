import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../../pages/SignupForm';
import LoginForm from '../../pages/LoginForm';
import './Navbar.css'

import Auth from '../../utils/auth';

const AppNavBar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Navbar id="loginControl">
        <Container fluid>
          <Link to="/">
            <div class='hover'>
              <Navbar.Brand>
                Home
              </Navbar.Brand>
            </div>
          </Link>
          <Navbar.Collapse id='navbar'>
            <hr color="white"></hr>
            <Nav class='login hover'>
              <Nav.Link as={Link} to='/'>
                {/* Your Magical Tool Kits */}
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    {/* See Your Tool Kit */}
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link class="hover" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav> 
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </div>
  );
};

export default AppNavBar;