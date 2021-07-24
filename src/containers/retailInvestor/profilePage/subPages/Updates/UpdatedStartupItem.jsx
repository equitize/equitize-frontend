import React from "react";
import PropTypes from "prop-types";

function UpdatedStartupItem({ info }){

    return(
        <>
            <div className="flex flex-col">
                <div className="flex flex-row justify-evenly items-center">
                    <div className="flex flex-row border-r-2 border-l-2 border-t-2 border-gray-400 rounded-t-2xl md:w-1/3 px-4 justify-center">
                        <h2 className="text-sm md:text-xl lg:text-2xl text-center font-Inter">{info.name}</h2>
                    </div>
                    <div className="w-0 md:w-1/6 px-2" />
                    <div className="w-1/5 md:w-1/3 px-2" />
                </div>
                <div className="flex flex-col h-5/6 border-2 border-gray-400 rounded-2xl p-4">
                    <h3 className="text-base md:text-2xl text-center font-bold font-Inter">{info.title}</h3>
                    <div className="flex flex-row justify-center py-4">
                        <img src={info.image} alt="Updated Image" className="h-24 w-24 md:h-48 md:w-72" />
                    </div>
                    <p className="text-base md:text-lg">{info.text}</p>
                </div>
            </div>
        </>
    )
}

UpdatedStartupItem.propTypes = {
    info: PropTypes.object
}

export default UpdatedStartupItem;