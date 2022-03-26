import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/user';
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.user);
    const { user } = userLogin;
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container fluid>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>    
                        </LinkContainer>
                        {user? (
                            <NavDropdown title={user.username} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) :
                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                            </LinkContainer>    
                        }
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header




