import React from "react";
import PropTypes from "prop-types";
import StartupItem from "./StartupItem";

function RecommendedStartups({ startups }){

    return (
        <>
            {/* <p className="font-Inter text-xl">Recommended for you</p> */}
            <div className="flex flex-row flex-wrap">
                {
                    startups.length === 1 && (
                        <div className="md:flex-shrink-0 w-full px-1 my-2">
                            <StartupItem info={startups[0]}/>
                        </div>
                    )
                }

                {
                    startups.length > 1 && (
                        startups.map((startup, index) => (
                            <div className="md:flex-shrink-0 md:w-1/3 px-1 my-2" key={index}>
                                <StartupItem info={startup}/>
                            </div>
                        ))
                    )
                }

                {
                    startups.length === 0 && (
                        <p>No startup found</p>
                    )
                }

            </div>
        </>
    )
}


RecommendedStartups.propTypes = {
    startups: PropTypes.array
}


export default RecommendedStartups;