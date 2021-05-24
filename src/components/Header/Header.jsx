import React from 'react';
import { Link } from "react-router-dom";
import Logo from './Logo.svg';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import PropTypes from 'prop-types'; // ES6

const Header = ({ toggle }) => {

    return (
        <nav className="flex justify-between items-center h-16 relative bg-white shadow-sm text-gray-600 body-font m-2" role='navigation'>
            <Link className="pl-8" to="/">
                <div className="flex flex-wrap items-center">
                    <img src={Logo} alt="Company Logo" />
                    <p className="font-Inter">EQUITIZE</p>
                </div>
            </Link>
            <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <div className='pr-8 md:block hidden'>
            <Link className="p-4 hover:text-gray-900" to="/About">About</Link>
                <Link className="p-4 hover:text-gray-900" to="/login">Login</Link>
                <Link className="p-4" to="/register">
                    <PrimaryButton text="Register" />
                </Link>
            </div>
        </nav>
    );
}

Header.propTypes = {
    toggle: PropTypes.func
}

export default Header;