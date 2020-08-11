import React from 'react';
import {
    Card,
    Row,
    Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './components/main_layout.scss';

export default function Dashboard(props) {
    return (
        <div id="dashboard" className="w-100 h-100">
            <div className="main_layout h-100 w-100">
                <Sidebar categories={props.categories} />
                <main>
                    <Link to="/newFood" className="btn btn-success">Add Food</Link>
                    <div className="food p-3">
                        <Row>
                            {props.food.map(foodItem => {
                                return (
                                    <Col key={foodItem.id} md={4}>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={foodItem.image} />
                                            <Card.Body>
                                                <Card.Title>{foodItem.name}</Card.Title>
                                                <Card.Text>
                                                    <p>{foodItem.description}</p>
                                                    <p className="font-weight-bold">Price: ${foodItem.price}</p>
                                                </Card.Text>
                                                {/* <Button variant="primary">Go somewhere</Button> */}
                                                <Link to={`/food/${foodItem.id}`} className="btn btn-info">Details</Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    );
}