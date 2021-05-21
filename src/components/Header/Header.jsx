import React from 'react';
import { Link } from "react-router-dom";
import Logo from './Logo.svg';

function Header() {

    return (
        <header className="text-gray-600 body-font m-2">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/">
                    <div className="flex flex-wrap items-center">
                        <img src={Logo} alt="Company Logo" />
                        <p className="font-Inter">EQUITIZE</p>
                    </div>
                </Link>
                <nav className="flex flex-wrap items-center text-base md:ml-auto">
                    <a className="mr-6 hover:text-gray-900" href="#about">About</a>
                    <Link to="/login">
                        <p className="mr-6 hover:text-gray-900">Login</p>
                    </Link>
                    <Link to="/register">
                        <button className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full">
                            Register
                        </button>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;