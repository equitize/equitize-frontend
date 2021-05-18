import React from 'react';

function Header() {

    return (
        <header className="text-gray-600 body-font m-2">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div>
                    Equitize
                </div>
                <nav className="flex flex-wrap items-center text-base md:ml-auto">
                    <a className="mr-6 hover:text-gray-900" href="#about">About</a>
                    <a className="mr-6 hover:text-gray-900" href="#contact">Contact</a>
                    <a className="mr-6 hover:text-gray-900" href="/login">Login</a>
                    <button className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full">
                        Register
                    </button>
                </nav>
            </div>
        </header>
    );

}

export default Header;