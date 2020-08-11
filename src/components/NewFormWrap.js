import React from 'react';
import './newFormWrap.scss';

export default function NewFormWrap({ children }) {
    return (
        <div className="new-form-wrap">
            {children}
        </div>
    );
}