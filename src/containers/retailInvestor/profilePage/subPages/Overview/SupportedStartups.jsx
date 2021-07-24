import React from "react";
import PropTypes from "prop-types";
import SupportedStartupItem from "./SupportedStartupItem";

function SupportedStartups({ data }){

    // Logic for more than 3 startups or pogination not completed yet

    return(
        <>
            {
                data.length > 0 ?
                    data.map((startup, index) => (
                        <SupportedStartupItem info={startup} key={index}/>
                    ))
                    : null
            }
        </>
    )
}

SupportedStartups.propTypes = {
    data: PropTypes.array
}

export default SupportedStartups;