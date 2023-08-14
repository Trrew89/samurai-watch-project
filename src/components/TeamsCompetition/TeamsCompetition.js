import React from 'react';
import {Roboto_Condensed} from 'next/font/google'
import './TeamsCompetition.css'

const roboto = Roboto_Condensed({
    weight: '400',
    subsets: ['latin'] 
})
const TeamsCompetition = () => {
    return (
        <h2 className={`teams-competition ${roboto.className}`}>G2 vs Fnatic</h2>
    );
};

export default TeamsCompetition;