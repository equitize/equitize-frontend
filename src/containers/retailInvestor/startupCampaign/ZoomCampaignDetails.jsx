import React from 'react'
import PropTypes from "prop-types";

function ZoomCampaignDetails({ zoomSessions }){

    // TODO Function for getting zoom link? What happens next? Multiple Links?

    return(
        <>
            <p className="font-Inter text-center md:text-xl underline">Zoom Campaign Meetings</p>
            <br/>
            <div className="flex flex-col space-y-2 space-x-1 sm:space-x-0">
                {
                    zoomSessions.map((session, index) => (
                        <div className="flex flex-row" key={index}>
                            <p className="font-Inter font-bold text-xs md:text-lg lg:text-xl w-1/2 text-right self-center">{session.date}</p>
                            <p className="font-Inter text-xs md:text-lg lg:text-xl w-1/2 self-center text-center">{session.time}</p>
                        </div>
                    ))
                }
            </div>
            <br />
            <button className="bg-custom-blue hover:bg-blue-700 font-bold py-2 text-white text-xs px-2 lg:px-0 text-sm lg:text-xl lg:w-2/3 self-center sm:mx-4">
                <p className="font-Inter">GET ZOOM LINK</p>
            </button>
        </>
    )
}

ZoomCampaignDetails.propTypes = {
    zoomSessions: PropTypes.array
}


export default ZoomCampaignDetails;