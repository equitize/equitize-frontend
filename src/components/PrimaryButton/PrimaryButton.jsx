import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

function PrimaryButton({ text, onClick, disabled, properties }){
    let cssProperties = classNames(properties, "bg-secondary text-white font-bold py-2 px-5 rounded-full")
    if (disabled){
        cssProperties = classNames(cssProperties, "bg-opacity-40")
    }
    else{
        cssProperties = classNames(cssProperties, "hover:bg-blue-700")
    }

    return (
        <>
            {
                disabled?
                    <button className={cssProperties} disabled={disabled} onClick={onClick}>
                        {text}
                    </button>
                    : <button className={cssProperties} onClick={onClick}>
                        {text}
                    </button>
            }
        </>
    )
}

PrimaryButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    properties: PropTypes.any
}

export default PrimaryButton;