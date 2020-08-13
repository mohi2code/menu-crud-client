import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './components/main_layout.scss';
import Grid from './components/Grid';
import Nav from './components/Nav';
import { Button } from 'react-bootstrap';

export default function Dashboard(props) {
    return (
        <div id="dashboard" className="w-100 h-100">
            <div className="main_layout h-100 w-100">
                <Sidebar categories={props.categories} />
                <main>
                    <Nav>
                        <Button variant="primary" size="sm" href="/newFood" className="mr-3">Add Food</Button>
                        <Button variant="primary" size="sm" href="/newCategory">Add Category</Button>
                    </Nav>
                    <Grid items={props.food} />
                </main>
            </div>
        </div>
    );
}
