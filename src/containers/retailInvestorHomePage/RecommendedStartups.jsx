import React from "react";
import PropTypes from "prop-types";
import StartupItem from "./StartupItem";

function RecommendedStartups({ startups }){

    return (
        <>
            <p className="font-Inter text-xl">Recommended for you</p>
            <div className="flex flex-row flex-wrap">
                {
                    startups.length > 0 ?
                        startups.map((startup, index) => (
                            <div className="w-1/2 md:w-1/3 px-3" key={index}>
                                <StartupItem info={startup}/>
                            </div>
                        ))
                        : null
                }
            </div>
        </>
    )
}


RecommendedStartups.propTypes = {
    startups: PropTypes.array
}


export default RecommendedStartups;