import React from "react";
import PropTypes from "prop-types";

function TabButtonWithBackground({ text, onClick, active }){
    return (
        <>
            {
                active ?
                    <button className="bg-gray-50 bg-opacity-40 hover:bg-gray-300 text-active-purple font-bold py-4 px-2 rounded-sm self-center text-base md:text-lg lg:text-xl"
                            onClick={onClick} >
                        {text}
                    </button>
                    :
                    <button className="bg-gray-50 bg-opacity-40 hover:bg-gray-300 text-gray-400 font-bold py-4 px-2 rounded-sm self-center text-base md:text-lg lg:text-xl"
                            onClick={onClick} >
                        {text}
                    </button>
            }
        </>
    )
}

TabButtonWithBackground.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool
}

export default TabButtonWithBackground;