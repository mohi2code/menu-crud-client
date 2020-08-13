import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Form,
    Col,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './components/main_layout.scss';
import NewFormWrap from './components/NewFormWrap';

export default function NewFood(props) {
    const [name, setName] = useState('');

    const submit = useCallback((e) => {
        e.preventDefault();

        const body = {
            name: name.trim(),
        }

        axios.post(`${props.API_URL}/categories`, body, {
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
    });

    return (
        <div id="newFood" className="w-100 h-100">
            <div className="main_layout h-100 w-100">
                <Sidebar categories={props.categories} />
                <main>
                    <div className="p-5">
                        <NewFormWrap>
                            <h3 className="text-center">Add New Category</h3>
                            <Form onSubmit={submit}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter food name" />
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                            </Form>
                        </NewFormWrap>
                    </div>
                </main>
            </div>
        </div>
    );
}