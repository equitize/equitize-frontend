import React from "react";
import PropTypes from 'prop-types';


function PrimaryErrorMessage({text}){
    return (
        <p className="bg-red-500 rounded-xl px-12 py-1 m-4 text-white">{text}</p>
    )
}

PrimaryErrorMessage.propTypes = {
    text: PropTypes.string
}

export default PrimaryErrorMessage;