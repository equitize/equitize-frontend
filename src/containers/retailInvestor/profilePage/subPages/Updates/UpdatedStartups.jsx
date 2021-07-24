import React from "react";
import PropTypes from "prop-types";
import UpdatedStartupItem from "./UpdatedStartupItem";

function UpdatedStartups({ data }){

    return(
        <>
            {
                data.length > 0 ?
                    data.map((startup, index) => (
                        <UpdatedStartupItem info={startup} key={index}/>
                    ))
                    :
                    <div className="flex">
                        <h2 className="text-center font-Inter font-bold text-3xl">No Updates were found.</h2>
                    </div>
            }
        </>
    )
}

UpdatedStartups.propTypes = {
    data: PropTypes.array
}

export default UpdatedStartups;