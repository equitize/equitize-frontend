import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Logo from './Logo.svg';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import PropTypes from 'prop-types'; // ES6
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';

// For redux
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoggedIn, loggedOut } from '../../store/auth';

const Header = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn)
    console.log(isLoggedIn)

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const hideMenu = () => {
            if(window.innerWidth > 768 && isOpen) {
                setIsOpen(false)
            }
        }

        window.addEventListener('resize', hideMenu)

        return () => {
            window.removeEventListener('resize', hideMenu)
        }
    })

    const signOut = () => {
        dispatch(loggedOut())
    }

    const navDisplay = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
                <>
                <Link to="/profile"><img src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg" className="m-2 inline object-cover w-12 mr-2 rounded-full" /></Link>
                    <Link className="p-4" to="/">
                        <PrimaryButton text="Sign Out" onClick={signOut} />
                    </Link>
                </>
            )
        } else {
            return (
                <>
                <Link className="p-4 hover:text-gray-900" to="/login">Login</Link>
                    <Link className="p-4" to="/register">
                        <PrimaryButton text="Register" />
                    </Link>
                </>
            )
        }
    }

    return (
        <div>
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
                <div className='flex-row pr-8 md:block hidden'>                
                    <Link className="p-4 hover:text-gray-900" to="/About">About</Link>
                    {navDisplay(isLoggedIn)}
                </div>
            </nav>

            <HeaderDropdown isOpen={isOpen} toggle={toggle}/>
        </div>
    );
}

Header.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
}

export default Header;