import React from "react";
import PropTypes from "prop-types";

function TabButton({ text, onClick, active }){
    return (
        <>
            {
                active ?
                    <button className="bg-gray-50 bg-opacity-40 hover:bg-gray-300 text-active-purple font-bold py-4 px-2 rounded-sm self-center text-sm lg:text-base"
                            onClick={onClick} >
                        {text}
                    </button>
                    :
                    <button className="bg-gray-50 bg-opacity-40 hover:bg-gray-300 text-gray-400 font-bold py-4 px-2 rounded-sm self-center text-sm lg:text-base"
                            onClick={onClick} >
                        {text}
                    </button>
            }
        </>
    )
}

TabButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool
}

export default TabButton;