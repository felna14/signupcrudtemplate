import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../actions';

const Header = () => {
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.postReducer);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" as={Link} to="/">
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} to="/add-form" href="#features">
                Student
              </Nav.Link> */}
              <Nav.Link href="#pricing" as={Link} to="/add-demo">
                Pricing
              </Nav.Link>
            </Nav>
            {userLoggedIn ? (
              <Nav>
                <Nav.Link as={Link} to="/add-form" href="#features">
                  Student
                </Nav.Link>
                <Nav.Link
                  href="#deets"
                  to="/"
                  onClick={() => dispatch(logOut())}
                >
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="#deets" as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
                <Nav.Link eventKey={2} href="#memes" as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )
    </div>
  );
};

export default Header;
