import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Form,
    Button
} from 'react-bootstrap';
import { getEmailFromQuery } from '../utils';

export default function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailOnChange = useCallback(e => setEmail(e.target.value));
    const passwordOnChange = useCallback(e => setPassword(e.target.value));
    const submit = useCallback(e => {
        e.preventDefault();

        const body = {
            email: email.trim(),
            password: password.trim()
        }

        axios.post(`${props.API_URL}/auth/login`, body)
            .then(res => {
                if (res.status == 200) {
                    props.setToken(res.data.token);
                    window.location = "/";
                }
            })
            .catch(err => {
                alert('Invalid Login !');
            });
    });

    useEffect(() => {
        setEmail(getEmailFromQuery());
    }, [])

    return (
        <>
            <Form onSubmit={submit} className="d-flex flex-column justify-content-center py-4">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={emailOnChange} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={passwordOnChange} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
            <hr></hr>
            <p className="text-center">Don't have an account ? <Link to="/register">Register</Link></p>
        </>
    );
}