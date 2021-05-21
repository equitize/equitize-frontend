import React from "react";
import PropTypes from 'prop-types';

function PrimaryButton({ text, onClick, disabled }){
    return (
        <button className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full" disabled={disabled} onClick={onClick}>
            {text}
        </button>
    )
}

PrimaryButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

export default PrimaryButton;