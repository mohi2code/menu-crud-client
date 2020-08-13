import React from 'react';
import {
    Card,
    Row,
    Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Grid(props) {
    return (
        <div id="grid" className="p-5">
            <Row>
                {props.items.map(foodItem => {
                    return (
                        <Col key={foodItem.id} lg={4} className="d-flex justify-content-center mb-3">
                            <Card style={{ width: '20rem' }}>
                                <Card.Img variant="top" src={foodItem.image} />
                                <Card.Body>
                                    <Card.Title>{foodItem.name}</Card.Title>
                                    <Card.Text>
                                        <p>{foodItem.description}</p>
                                        <p className="font-weight-bold">Price: ${foodItem.price}</p>
                                    </Card.Text>
                                    <Link to={`/food/${foodItem.id}`} className="btn btn-outline-info">Details</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}