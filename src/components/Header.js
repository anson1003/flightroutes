import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function Header() {
  return (
    <Navbar
      bg="black"
      variant="dark"
      expand="lg"
      className="fixed-top mb-5 p-1"
    >
      <Container>
        <Navbar.Brand>
          <img
            src="./images/logo1.png" // Replace with your logo image path
            alt="Logo"
            height="50"
            width="50"
            className="d-inline-block align-left"
          />
          <span
            style={{
              background: "linear-gradient(to right,  #337CCF, #191D88)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            <strong>FlyMe</strong>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/routes" className="nav-link">
                Routes
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/airlines" className="nav-link">
                Airlines
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/airports" className="nav-link">
                Airports
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
