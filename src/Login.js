import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import './login.css';

export default function Login(props) {
    return (
        <Row id="login" className="m-0 h-100">
            <Col md={{ span: 4, offset: 4 }}
                sm={{ span: 12 }}
                className="align-self-center p-0">
                <div className="login-form-wrap bg-white">
                    <h1 className="text-center page-title">Login</h1>
                    <LoginForm API_URL={props.API_URL} token={props.token} setToken={props.setToken} />
                </div>
            </Col>
        </Row>
    );
}
