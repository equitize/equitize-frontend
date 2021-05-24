import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'; // ES6

const HeaderDropdown = ({isOpen, toggle}) => {
    return (
        <div className={isOpen ? "grid grid-rows-5 text-center items-center bg-white" : "hidden"} onClick={toggle}>
            <Link className="p-4" to='/about'>About</Link>
            <Link className="p-4 font-bold" to='/login'>
                Login
            </Link>
            <Link className="p-4 font-bold bg-secondary hover:bg-blue-700 text-white py-2 px-5" to='/register'>
                Register
            </Link>
        </div>
    )
}

HeaderDropdown.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
}

export default HeaderDropdown
