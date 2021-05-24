import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function PrimaryTextArea({ placeholder, register, properties }){
    const cssProperties = classNames(properties, "rounded-xl bg-gray-100 placeholder-gray-400 px-2 py-2 xl:text-xl m-4 font-Inter")

    return(
        <>
            <textarea placeholder={placeholder} {...register}
                      className={cssProperties}>
            </textarea>
        </>
    )
}

PrimaryTextArea.propTypes = {
    placeholder: PropTypes.string,
    register: PropTypes.object,
    properties: PropTypes.any
}


export default PrimaryTextArea;