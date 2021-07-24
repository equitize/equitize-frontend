import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

function PrimaryInput({ placeholder, register, properties, onChange, value, type }){
    const cssProperties = classNames(properties, "rounded-xl bg-gray-100 placeholder-gray-400 px-2 py-2 text-base md:text-lg xl:text-xl m-4 font-Inter")

    return (
        <input placeholder={placeholder} {...register} className={cssProperties} onChange={onChange}
               value={value} type={type} />
    )
}

PrimaryInput.propTypes = {
    placeholder: PropTypes.string,
    register: PropTypes.object,
    properties: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.any,
    type: PropTypes.string
}

export default PrimaryInput;