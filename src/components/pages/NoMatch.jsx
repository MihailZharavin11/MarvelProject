import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../resources/img/NotFound.jpg';

const NoMatch = () => {
    return (
        <div style={{
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center'
        }}>
            <img style={
                {
                    'width': '300px',
                    'height': '300px',
                }
            }
                src={NotFoundImage} alt="NotFound" />
            <p style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}
            >Page doesn't exist</p>
            <Link style={{ 'display': 'block', 'color': 'red', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}
                to='/'>Back to main Page</Link>
        </div >
    );
}

export default NoMatch;
