import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'; // ES6

const Header = ({ toggle }) => {
    return (
        <nav className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono' role='navigation'>
            <Link to='/' className='pl-8'>Equitize</Link>
            <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <div className="pr-8 md:block hidden">
                <Link className="p-4" to='/about'>About</Link>
                <Link className="p-4" to='/contact'>Contact</Link>
                <Link className="p-4" to='/keyFeatures'>Key Features</Link>
                <Link className="p-4 font-bold" to='/login'>
                    Login
                </Link>
                <Link className="p-4 font-bold bg-secondary hover:bg-blue-700 text-white py-2 px-5 rounded-full" to='/register'>
                    Register
                </Link>
            </div>
        </nav>

    )
}

Header.propTypes = {
    toggle: PropTypes.func
}

export default Header