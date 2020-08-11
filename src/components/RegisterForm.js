import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Form,
    Button
} from 'react-bootstrap';

export default function RegisterForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const emailOnChange = useCallback(e => setEmail(e.target.value));
    const passwordOnChange = useCallback(e => setPassword(e.target.value));
    const passwordRepeatOnChange = useCallback(e => setPasswordRepeat(e.target.value));
    const submit = useCallback(e => {
        e.preventDefault();

        const body = {
            email: email.trim(),
            password: password.trim(),
            password_repeat: passwordRepeat.trim()
        }

        axios.post(`${props.API_URL}/auth/register`, body, {
            headers: {
                authorization: `Bearer ${props.token}`
            }
        })
            .then(res => {
                if (res.status == 200)
                    window.location = `/login?email=${res.data.email}`
            })
            .catch(err => {
                console.error(err.response.data.message);
                alert('Cannot register check logs');
            });
    });

    return (
        <>
            <Form onSubmit={submit} className="d-flex flex-column justify-content-center py-4">
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={emailOnChange} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={passwordOnChange} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="password_repeat">
                    <Form.Label>Enter password again</Form.Label>
                    <Form.Control value={passwordRepeat} onChange={passwordRepeatOnChange} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
            <hr></hr>
            <p className="text-center">have an account ? <Link to="/login">Login</Link></p>
        </>
    );
}