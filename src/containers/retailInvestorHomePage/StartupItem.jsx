import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { getTailwindWidthFraction } from "../../helpers";
import ProgressBar from "../../components/ProgressBar/ProgressBar";


function StartupItem({ info }){
    const history = useHistory()
    const percentageRaised = info.fundedAmount/info.campaignGoal * 100
    const progressBarWidth = getTailwindWidthFraction(percentageRaised)

    function viewStartup(){
        const URL = `/startup/${info.id}`
        history.push(URL)
    }

    return (
        <>
            <div className="py-4 space-y-3">
                <img src={info.imageLink} className="h-32 sm:h-48 lg:h-72 cursor-pointer m-auto" alt="Startup Image" onClick={viewStartup}/>
                <p className="font-bold font-Rubik text-xl md:text-2xl lg:text-4xl text-center">{info.name}</p>
                <br />
                <p className="font-Inter text-sm md:font-lg lg:text-xl">{info.description}</p>
                <ProgressBar width={progressBarWidth} />
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/2 space-y-2">
                        <p className="font-Inter text-xs md:text-base"><span className="text-green-500">S${info.fundedAmount}</span> funded</p>
                        <p className="font-Inter text-xs md:text-base"><span className="text-secondary">{percentageRaised}%</span> Raised</p>
                    </div>
                    <div className="flex flex-col w-1/2 space-y-2">
                        <p className="font-Inter text-xs md:text-base"><span className="text-active-purple">{info.sharesAllocated}%</span> Equity Stake</p>
                        <p className="font-Inter text-xs md:text-base"><span className="text-active-purple">{info.endTime}</span> Hours left</p>
                    </div>
                </div>
            </div>
        </>
    )
}

StartupItem.propTypes = {
    info: PropTypes.object
}

export default StartupItem;