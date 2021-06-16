import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { getTailwindWidthFraction } from "../../helpers";
import { useHistory } from "react-router-dom";


function FeaturedStartup({ info }){
    const history = useHistory()
    const percentageRaised = info.fundedAmount/info.campaignGoal * 100
    const progressBarWidth = getTailwindWidthFraction(percentageRaised)

    function viewStartup(){
        const URL = `/startup/${info.id}`
        history.push(URL)
    }

    return (
        <>
            <p className="font-Inter text-xl">Featured Startup</p>
            <div className="flex flex-col md:flex-row space-x-2">
                <img src={info.imageLink} className="md:w-1/2 lg:w-2/3 cursor-pointer" alt="Featured Startup Image" onClick={viewStartup}/>
                <div className="md:w-1/2 lg:w-1/3 flex flex-col">
                    <p className="font-bold font-Rubik text-xl md:text-2xl lg:text-4xl">{info.name}</p>
                    <br />
                    <p className="font-Inter md:text-xl">{info.description}</p>
                    <ProgressBar width={progressBarWidth} />
                    <div className="flex flex-row">
                        <div className="flex flex-col w-1/2">
                            <p className="font-Inter text-sm md:text-md"><span className="text-green-500">S${info.fundedAmount}</span> funded</p>
                            <p className="font-Inter text-sm md:text-md"><span className="text-secondary">{percentageRaised}%</span> Raised</p>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <p className="font-Inter text-sm md:text-md"><span className="text-active-purple">{info.sharesAllocated}%</span> Equity Stake</p>
                            <p className="font-Inter text-sm md:text-md"><span className="text-active-purple">{info.endTime}</span> Hours left</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

FeaturedStartup.propTypes = {
    info: PropTypes.object.isRequired
}

export default FeaturedStartup;