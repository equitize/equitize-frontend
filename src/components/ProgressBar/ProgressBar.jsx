import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function ProgressBar({ width }){
    const cssProperties = classNames(width, "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary")

    return (
        <>
            <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div className={cssProperties}></div>
                </div>
            </div>
        </>
    )
}

ProgressBar.propTypes = {
    width: PropTypes.string
}

export default ProgressBar;