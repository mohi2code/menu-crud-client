import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RegisterForm from './components/RegisterForm';
import './login.css';

export default function Register(props) {
    return (
        <Row id="login" className="m-0 h-100">
            <Col md={{ span: 4, offset: 4 }}
                sm={{ span: 12 }}
                className="align-self-center p-0">
                <div className="login-form-wrap bg-white">
                    <h1 className="text-center">Register</h1>
                    <RegisterForm API_URL={props.API_URL} token={props.token} setToken={props.setToken} />
                </div>
            </Col>
        </Row>
    );
}
