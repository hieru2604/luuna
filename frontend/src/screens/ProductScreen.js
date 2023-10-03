import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Bagde from 'react-bootstrap/Badge';
import Rating from '../components/Rating';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div>
        <Row>
          <Col md={6}>
            <img
              className="img-large"
              src={product.image}
              alt={product.name}
            ></img>
          </Col>
          <Col md={3}>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <Helmet>
                  <h1>{product.name}</h1>
                </Helmet>
              </ListGroup.Item>
              <ListGroup.item>
                <Rating>
                  Rating = {product.rating}
                  numReviews = {product.numReviews}
                </Rating>
              </ListGroup.item>
              <ListGroup.item>Price: ${product.price}</ListGroup.item>
              <ListGroup.item>
                Description:
                <p>{product.description}</p>
              </ListGroup.item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup varient="flush">
                  <ListGroup.item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.item>
                  <ListGroup.item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.CountInStock > 0 ? (
                          <Bagde bg="success">In Stock</Bagde>
                        ) : (
                          <Bagde bg="danger">Unavailable</Bagde>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.item>
                  {product.CountInStock > 0 && (
                    <ListGroup.item>
                      <div className="d-grid">
                        <Button varient="primary">Add to Cart</Button>
                      </div>
                    </ListGroup.item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProductScreen;
