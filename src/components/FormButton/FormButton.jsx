import React from "react";
import PropTypes from "prop-types";

function FormButton({ text, onClick, disabled }){
    return (
        <button className="bg-custom-gray hover:bg-gray-50 font-bold py-3 px-2 self-stretch text-xs sm:text-sm lg:text-xl lg:px-5 rounded-md w-1/2 md:w-3/4 lg:w-2/3 mx-0 lg:mx-4" disabled={disabled} onClick={onClick}>
            {text}
        </button>
    )
}

FormButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
}

export default FormButton;