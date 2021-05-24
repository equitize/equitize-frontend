import React from "react";
import PropTypes from "prop-types";

function PrimaryUploadButton({ text, onClick }){

    return(
        <>
            <button className="bg-gray-100 placeholder-gray-400 hover:bg-gray-300 font-bold py-4 px-4 rounded-xl self-center text-sm lg:text-xl"
                    onClick={onClick}>
                {text}
            </button>
        </>
    )
}

PrimaryUploadButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default PrimaryUploadButton;