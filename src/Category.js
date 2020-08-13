import React, { useState, useEffect, useCallback } from 'react';
import { getIdParam } from './utils'
import axios from 'axios';
import {
    Card,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './components/main_layout.scss';
import Grid from './components/Grid';
import Nav from './components/Nav';

export default function Category(props) {
    const [id, setId] = useState(useParams().id);
    const [food, setFood] = useState([]);

    useEffect(() => {
        axios.get(`${props.API_URL}/categories/${id}`, {
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
    }, [id]);

    return (
        <div id="category" className="w-100 h-100">
            <div className="main_layout h-100 w-100">
                <Sidebar categories={props.categories} onClick={e => setId(getIdParam())} />
                <main>
                    <Nav>
                        <Button variant="primary" size="sm" href="/newCategory" className="mr-3">Add Category</Button>
                        <Button variant="outline-warning" size="sm" href={`/editCategory/${id}`}>Edit Category</Button>
                    </Nav>
                    <Grid items={food} />
                </main>
            </div>
        </div>
    );
}

