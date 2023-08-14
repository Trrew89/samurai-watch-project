import React from 'react';
import {Oswald} from 'next/font/google'
import './MyButton.css';

const oswald = Oswald({ 
    weight: '400',
    subsets: ['latin'] 
})

const MyButton = ({children, className, ...props}) => {
    return (
        <button {...props} className={`myBtn ${oswald.className} ${className || ''}`}>
            {children}
        </button>
    );
};

export default MyButton;