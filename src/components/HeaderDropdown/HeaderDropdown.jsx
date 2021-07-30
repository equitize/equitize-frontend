import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'; // ES6
import jwt_decode from "jwt-decode"

// For redux
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoggedIn, loggedOut, getToken } from '../../store/auth';

const HeaderDropdown = ({isOpen, toggle}) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn)
    const accessToken = useSelector(getToken)

    const signOut = () => {
        dispatch(loggedOut())
    }

    const isRetailInvestor = (accessToken) => {
        if (isLoggedIn) {
            var decoded = jwt_decode(accessToken)
            // console.log(decoded)
            if (decoded.permissions[0] === "retailInvestor:verified" || decoded.permissions[0] === "retailInvestor:unverified") {
                return true
            }
        }
        return false
    }

    return (
        <div className={isOpen ? "grid grid-rows-5 text-center items-center bg-white" : "hidden"} onClick={toggle}>
            {
                isRetailInvestor(accessToken) ? <Link to="/home" className="p-4 hover:bg-blue-400 py-2 px-5" >Live Campaigns</Link> : null
            }
            <Link className="p-4 hover:bg-blue-400 py-2 px-5" to='/about'>Guide</Link>
            {
                isLoggedIn ?
                    <>
                        <Link to="/profile" className="p-4 hover:bg-blue-400 py-2 px-5">Profile</Link>
                        <Link className="p-4 font-bold bg-secondary hover:bg-blue-700 text-white py-2 px-5" onClick={signOut}>Sign Out</Link>
                    </>
                :
                    <>
                        <Link className="p-4 font-bold" to='/login'>
                            Login
                        </Link>
                        <Link className="p-4 font-bold bg-secondary hover:bg-blue-700 text-white py-2 px-5" to='/register'>
                            Register
                        </Link>
                    </>

            }
        </div>
    )
}

HeaderDropdown.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
}

export default HeaderDropdown
