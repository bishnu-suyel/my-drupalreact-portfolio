import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Fixed Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Bishnu Suyel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-3" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-md-5 me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/projects">
                Projects
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page content with equal margins */}
      <Container>
        <main>{children}</main>
      </Container>

      {/* Footer */}
      <footer className="text-center bg-dark text-light py-3 fixed-bottom">
        <p>
          &copy; {new Date().getFullYear()} Bishnu Suyel. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
