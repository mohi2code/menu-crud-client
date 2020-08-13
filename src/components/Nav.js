import React, { useCallback, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './nav.scss';

export default function Nav({ children }) {
    const [toggled, setToggled] = useState(false);

    useEffect(() => {
        if (toggled) {
            document.querySelector('.sidebar').classList.toggle('show');
        }
    }, [toggled])

    return (
        <div id="navbar" className="d-flex px-5 py-3 align-items-center">
            <div className="hamburger d-none" onClick={() => setToggled(!toggled)}>
                <div className="l1"></div>
                <div className="l2"></div>
                <div className="l3"></div>
            </div>
            <div className="nav-main d-flex ml-auto">
                {children}
            </div>
        </div>
    );
}