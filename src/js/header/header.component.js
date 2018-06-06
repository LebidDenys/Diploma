import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
    return (
        <div className="menu">
            <Link to='/map' className="item">
                map
            </Link>

            <Link to='/admin' className="item">
                admin
            </Link>
        </div>
    )
}

export default Header
