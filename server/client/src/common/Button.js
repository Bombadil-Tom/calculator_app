import React from 'react';
import 'style/Button.css'

const Button = ({title, onClick}) => {
    return (
        <button onClick={onClick} value={title}>{title}</button>
    );
}

export default Button;