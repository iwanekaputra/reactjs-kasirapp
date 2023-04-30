import { Navbar, NavDropdown, Form, FormControl, Button, Nav, Container } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><strong>Kasir</strong> App</Navbar.Brand>
          
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  )
}

export default NavbarComponent;