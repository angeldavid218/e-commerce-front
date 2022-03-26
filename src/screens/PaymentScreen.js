import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/cart';

function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const cart = useSelector((state) => state.cart);
    const { shippingInfo } = cart;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!shippingInfo.address) {
        navigate('/shipping');
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeOrder');
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='Paypal or Credit Card' id='paypal' name='paymentMethod' checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
