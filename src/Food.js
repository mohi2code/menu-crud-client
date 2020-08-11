import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Card,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './components/main_layout.scss';

export default function Dashboard(props) {
    const [id, setId] = useState(useParams().id);
    const [food, setFood] = useState({});

    useEffect(() => {
        axios.get(`${props.API_URL}/food/${id}`, {
            headers: {
                authorization: `Bearer ${props.token}`
            }
        })
            .then(res => {
                if (res.status == 200)
                    setFood(res.data);
            })
            .catch(err => {
                if (err.response.status == 401) {
                    props.setToken('');
                } else {
                    console.error(err.response.data);
                }
            });
    }, []);

    const deleteFood = useCallback((e) => {
        axios.delete(`${props.API_URL}/food/${id}`, {
            headers: {
                authorization: `Bearer ${props.token}`
            }
        })
            .then(res => {
                if (res.status == 200)
                    window.location = "/";
            })
            .catch(err => {
                if (err.response.status == 401) {
                    props.setToken('');
                } else {
                    console.error(err.response.data);
                }
            });
    }, []);

    return (
        <div id="dashboard" className="w-100 h-100">
            <div className="main_layout h-100 w-100">
                <Sidebar categories={props.categories} />
                <main>
                    <div className="p-5 d-flex justify-content-center">
                        <Card style={{ width: '40rem' }}>
                            <Card.Img variant="top" src={food.image} />
                            <Card.Body>
                                <Card.Title>{food.name}</Card.Title>
                                <Card.Text>
                                    <span className="d-block py-4">{food.description}</span>
                                    <span className="d-block"><span className="font-weight-bolder">price: </span>${food.price}</span>
                                    <span className="d-block"><span className="font-weight-bolder">calories: </span>{food.calories} CAL</span>
                                </Card.Text>
                                <div className="d-flex">
                                    <Link to={`/editFood/${food.id}`} className="btn btn-warning">Edit</Link>
                                    <Button onClick={deleteFood} variant="outline-danger" className="ml-3">Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}