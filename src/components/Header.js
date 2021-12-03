import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
function Header() {
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container fluid>
                    <Navbar.Brand href="#">ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-auto">
                        <Nav.Link href="/cart"> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                        <Nav.Link href="/login"><i className="fas fa-user"></i> Login</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header




