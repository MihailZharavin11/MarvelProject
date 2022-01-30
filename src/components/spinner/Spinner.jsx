import  Rocket from './img/Rocket.gif';
import './Spinner.scss';
import React from 'react';

const Spinner = () => {
    return (
        <div className='spinner'>
            <img src={Rocket} alt="loading" />
        </div>
    );
}

export default Spinner;
