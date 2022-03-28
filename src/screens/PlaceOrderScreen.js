import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../redux/cart';
import { createOrder  } from '../redux/orders';

function PlaceOrderScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderCreate = useSelector((state) => state.orders);
    const {order, error} = orderCreate; 
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2); 
    const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
    const taxPrice = Number((0.002) * itemsPrice).toFixed(2);
    const totalPrice = Number(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));
    
    if (!cart.paymentMethod) {
        navigate('/payment');
    }
 /*    useEffect(() => {
        if (error) {
            navigate(`/order/${order._id}}`);
        }
    }, [error, order]); */

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: cart.shippingInfo,
            paymentMethod: cart.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }))
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingInfo.address}, {cart.shippingInfo.city}
                                {' '}
                                {cart.shippingInfo.postalCode}, 
                                {' '}
                                {cart.shippingInfo.country} 
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order items</h2>
                            {cartItems.length === 0 ? <Message varint='info' >your cart is empty</Message> : 
                                <ListGroup variant='flush'>
                                    {cartItems.map((item) => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={1}>
                                                      <Image src={item?.image} alt={item?.name} rounded fluid />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disable={cartItems.length === 0}
                                    onClick={placeOrder}
                                >
                                    Place order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
