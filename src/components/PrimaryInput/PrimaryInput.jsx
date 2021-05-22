import React from "react";
import PropTypes from 'prop-types';

function PrimaryInput ({ placeholder, register }){
    return (
        <input placeholder={placeholder} {...register} className="rounded-xl bg-gray-100 placeholder-gray-400 px-2 py-2 text-center text-xl m-4 font-Inter"/>
    )
}

PrimaryInput.propTypes = {
    placeholder: PropTypes.string,
    register: PropTypes.object
}

export default PrimaryInput;