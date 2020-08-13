import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar(props) {
    return (
        <div className="sidebar" onClick={props.onClick}>
            <h1 className="sidebar-header">Menu CRUD</h1>
            <ul className="sidebar-menu w-100 h-100">
                <li><Link to="/">Dashboard</Link></li>
                <li>
                    <Link to="/">Categories</Link>
                    <ul>
                        {props.categories.map(category => {
                            return (
                                <li key={category.id}>
                                    <Link to={`/categories/${category.id}`}>{category.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        </div>
    );
}