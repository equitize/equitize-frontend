import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formattedSum } from "../../../helpers";
import moment from "moment";

function InvestmentDetails({info}){
    const history = useHistory()

    function investStartup(){
        const URL = `/startup/${info.startupId}/invest`
        history.push(URL)
    }

    return (
        <>
        { info === null ? <div><p>Loading...</p></div> : 
            <>
                <div className="flex flex-row space-x-4">
                    <p className="font-Inter text-green-500 font-bold text-xs md:text-xl lg:text-2xl w-1/2 text-right self-center">S${formattedSum(info.campaignDetails.currentlyRaised)}</p>
                    <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">of ${formattedSum(info.campaignDetails.goal)} raised</p>
                </div>
                <div className="flex flex-row space-x-4">
                    <p className="font-Inter text-sm md:text-xl lg:text-2xl w-1/2 text-right">{info.campaignDetails.currentlyRaised/info.campaignDetails.goal * 100}%</p>
                    <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Raised</p>
                </div>
                <div className="flex flex-row space-x-4">
                    <p className="font-Inter text-sm md:text-xl lg:text-2xl w-1/2 text-right">{info.campaignDetails.sharesAllocated}%</p>
                    <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Equity Stake</p>
                </div>
                <div className="flex flex-row space-x-4">
                    <p className="font-Inter text-sm md:text-xl lg:text-2xl w-1/2 text-right">{ moment(info.campaignDetails.endDate).format("llll") }</p>
                    <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">End Date</p>
                </div>
                <br />
                <button onClick={investStartup}
                        className="bg-custom-blue hover:bg-blue-700 font-bold py-2 text-white text-xs px-2 lg:px-0 text-sm lg:text-xl lg:w-2/3 self-center sm:mx-4">
                    <p className="font-Inter">INVEST THIS NOW</p>
                </button>
            </>
        }
        </>

    )
}

InvestmentDetails.propTypes = {
    info: PropTypes.object,
    startupId: PropTypes.number
}

export default InvestmentDetails;