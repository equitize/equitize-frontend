import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function PrimaryTextArea({ placeholder, register, properties, onChangeFunc, value }){
    const cssProperties = classNames(properties, "rounded-xl bg-gray-100 placeholder-gray-400 px-2 lg:px-4 py-2 xl:text-xl sm:m-4 font-Inter")

    return(
        <>
            <textarea placeholder={placeholder} {...register}
                      className={cssProperties} onChange={(e) => onChangeFunc(e.target.value)} value={value}>
            </textarea>
        </>
    )
}

PrimaryTextArea.propTypes = {
    placeholder: PropTypes.string,
    register: PropTypes.object,
    properties: PropTypes.any,
    onChangeFunc: PropTypes.func,
    value: PropTypes.string
}


export default PrimaryTextArea;