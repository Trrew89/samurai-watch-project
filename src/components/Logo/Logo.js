import React from 'react';
import {Oswald} from 'next/font/google'
import './Logo.css'

const oswald = Oswald({ 
    weight: '700',
    subsets: ['latin'] 
})
const Logo = () => {
    return (
        <h3 className={`logo ${oswald.className}`}>
            Samurai Army Watch Party
        </h3>
    );
};

export default Logo;