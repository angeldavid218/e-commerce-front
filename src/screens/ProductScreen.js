import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { getProductApi } from '../redux/products';

export default function ProductScreen() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const { product, isLoading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProductApi(params.id));
    }, [dispatch, params]);

    const addToCart = () => {
        navigate(`/cart/${params.id}?qty=${qty}`);
    };

    
    return (
        <div>
            <Link to='/' className='btn btn-light mb-4'>Go back</Link>
            {
                isLoading ? <Loader />
                : error ? <Message variant={'danger'} > {error} </Message>
                :
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8E825'} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: $ {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>
                                    <strong>$ {product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>
                                    <strong>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' onClick={addToCart} type='button' disabled={product.countInStock === 0 }>Add to cart</Button>
                            </ListGroup.Item>
                            {
                                product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((el) => (
                                                            <option value={el + 1} key={el + 1}>
                                                                {el + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            }
        </div>
    )
}



