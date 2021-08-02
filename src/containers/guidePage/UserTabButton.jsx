import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";


function UserTabButton({icon, active, onClickFunc, text}){
    let cssProperties = "flex flex-row rounded-md text-white w-1/3 md:w-1/4 justify-center items-center p-3 md:space-x-4 cursor-pointer"
    if (active){
        cssProperties = classNames(cssProperties, "bg-secondary")
    }
    else if(!active){
        cssProperties = classNames(cssProperties, "bg-gray-400")
    }

    return(
        <>
            <div className={cssProperties} onClick={onClickFunc} >
                <img src={icon} alt="User icon" className="w-8" />
                <p className="font-Rubik text-xs sm:text-sm lg:text-xl font-bold">{text}</p>
            </div>
        </>
    )
}

UserTabButton.propTypes = {
    icon: PropTypes.element,
    active: PropTypes.bool,
    onClickFunc: PropTypes.func,
    text: PropTypes.string
}

export default UserTabButton;
