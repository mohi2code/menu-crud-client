import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Form,
    Col,
    Button
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './components/main_layout.scss';
import NewFormWrap from './components/NewFormWrap';

export default function EditFood(props) {
    const [id, setid] = useState(useParams().id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState(0);
    const [calories, setCalories] = useState(0);
    const [image, setImage] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${props.API_URL}/food/${id}`, {
            headers: {
                authorization: `Bearer ${props.token}`
            }
        })
            .then(res => {
                if (res.status == 200) {
                    setName(res.data.name);
                    setDescription(res.data.description);
                    setCategoryId(res.data.category_id);
                    setPrice(res.data.price);
                    setCalories(res.data.calories);
                    setImage(res.data.image);
                }
            })
            .catch(err => {
                if (err.response.status == 401) {
                    props.setToken('');
                    window.location = "/";
                } else {
                    console.error(err.response.data);
                }
            });
    }, []);

    useEffect(() => {
        axios.get(`${props.API_URL}/categories`, {
            headers: {
                authorization: `Bearer ${props.token}`
            }
        })
            .then(res => {
                if (res.status == 200)
                    setCategories(res.data);
            })
            .catch(err => {
                if (err.response.status == 401) {
                    props.setToken('');
                    window.location = "/";
                } else {
                    console.error(err.response.data);
                }
            });
    }, []);

    const submit = useCallback((e) => {
        e.preventDefault();

        const body = {
            name: name.trim(),
            description: description.trim(),
            category_id: categoryId,
            price,
            calories,
            image: image.trim(),
        }

        axios.put(`${props.API_URL}/food/${id}`, body, {
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
                            <h3 className="text-center">Edit Food</h3>
                            <Form onSubmit={submit}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter food name" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.01" placeholder="Enter food price" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="calories">
                                        <Form.Label>Calories</Form.Label>
                                        <Form.Control type="number" value={calories} onChange={(e) => setCalories(e.target.value)} min="0" step="0.1" placeholder="Enter food calories" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" type="sting" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="1234 Main St" />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control as="select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                            <option>...</option>
                                            {categories.map(category => {
                                                return <option key={category.id} value={category.id}>{category.name}</option>
                                            })}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="image">
                                        <Form.Label>Image url</Form.Label>
                                        <Form.Control type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image url" />
                                    </Form.Group>
                                </Form.Row>

                                <Button variant="primary" type="submit">
                                    save
                                </Button>
                            </Form>
                        </NewFormWrap>
                    </div>
                </main>
            </div>
        </div>
    );
}