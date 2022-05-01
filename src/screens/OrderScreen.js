import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../redux/cart';
import { createOrder, getOrderDetails, resetOrder } from '../redux/orders';
import { clearItems } from '../redux/cart'

function OrderScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const orderId = params.id;
    const orderState = useSelector((state) => state.orders);
    const { order, error, isLoading } = orderState;
    useEffect(() => {
        if (orderId && Object.keys(order).length === 0) {
            dispatch(getOrderDetails(orderId));
        }
    }, [orderId, orderState,dispatch]);
    const itemsPrice = order?.orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2); 
  

    return isLoading ? (<Loader />) : error ? (<Message variant='danger'> {error}</Message>) :
    (
        <div>
            <h1>Order: {order._id} </h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order?.user.name}</p>
                            <p><strong>Email: </strong>{order?.user.email}</p>
                            <p>
                                <strong>Shipping: </strong>
                                {order?.shippingAddress?.address}, {order?.shippingAddress?.city}
                                {' '}
                                {order?.shippingAddress?.postalCode}, 
                                {' '}
                                {order?.shippingAddress?.country} 
                            </p>
                            {order.isDelivered? (
                                <Message variant='success'> Delivered on {order.deliveredAt} </Message>
                            ) : (
                                <Message variant='warning'> Not Delivered </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid? (
                                <Message variant='success'> paid on {order.paidAt} </Message>
                            ) : (
                                <Message variant='warning'> Not paid </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order items</h2>
                            {order?.orderItems.length === 0 ? <Message varint='info' >your cart is empty</Message> : 
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item) => (
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
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
