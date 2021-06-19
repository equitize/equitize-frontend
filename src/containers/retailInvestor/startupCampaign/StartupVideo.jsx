import React from "react";
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy'

function StartupVideo({ video }){

    // TODO
    //  Replace with actual video & libraries to render it
    //  Temporary Placeholder
    return (
        <div className="flex">
            <ReactPlayer url={video}
                         config={{
                             file: {
                                 forceVideo: true
                             }
                         }}
                         controls={true}
                         volume={1}
                         width="100%"
                         height="100%"
            />
        </div>
    )
}

//TODO Change Proptype when using link instead
StartupVideo.propTypes = {
    video: PropTypes.any
}

export default StartupVideo;