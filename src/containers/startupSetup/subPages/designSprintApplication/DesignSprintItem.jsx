import React from "react";
import PropTypes from 'prop-types';

function DesignSprintItem({ text, selected, onClick }){




    return (
        <div onClick={onClick}>
            {
                selected ?
                    <div className="flex flex-wrap bg-custom-green placeholder-gray-400 hover:bg-gray-300 font-bold py-4 px-10 m-1 justify-center rounded-xl text-sm lg:text-xl">
                        <p className="text-center place-self-center font-Inter">{text}</p>
                    </div>
                    : <div className="flex flex-wrap bg-gray-100 placeholder-gray-400 hover:bg-custom-green font-bold py-4 px-10 m-1 justify-center rounded-xl text-sm lg:text-xl">
                        <p className="text-center place-self-center font-Inter">{text}</p>
                    </div>
            }
        </div>

    )
}

DesignSprintItem.propTypes = {
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}



export default DesignSprintItem;