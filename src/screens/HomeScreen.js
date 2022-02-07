import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProductsApi } from '../redux/products';
function HomeScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsApi());
    }, [dispatch]);

    const { error, isLoading, products } = useSelector((state) => state.products);


    return (
        <div>
            <h1>Latest products</h1>
            {
                isLoading ? <Loader />
                : error ? <Message variant={'danger'} > {error} </Message>
                :
                <Row>
                    {products.map((product) => 
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                            <h3>{product.name}</h3>
                            <Product product={product} />
                        </Col>
                    )}
                </Row>
            }
        </div>
    )
}

export default HomeScreen
