import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../redux/user';

function LoginScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'; 

    const userLogin =  useSelector((state) => state.user);
    const {error, user, isLoading, errors} = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [user, redirect]);

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant='danger'>{errors}</Message> }
            {isLoading &&  <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter an email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className='mt-3' type='submit' variant='primary'>Submit</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New customer? <Link to={redirect? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;


