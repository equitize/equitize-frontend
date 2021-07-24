import React from "react";
import PropTypes from "prop-types";
import { formattedSum, round } from "../../../../../helpers";
import { useHistory } from "react-router-dom";

function SupportedStartupItem({ info }){
    const history = useHistory()

    function visitStartupCampaign(){
        history.push(`/startup/${info.startupId}`)
    }

    return(
        <>
            <div className="border-4 border-gray-300 rounded-xl w-full flex flex-row cursor-pointer px-1 md:px-2" onClick={visitStartupCampaign}>
                <div className="flex flex-col w-2/3 lg:w-1/2 py-4 items-center space-y-2">
                    <h2 className="text-3xl font-bold text-center">{info.name}</h2>
                    <div className="flex flex-row space-x-4 w-full">
                        <p className="font-Inter text-green-500 font-bold text-sm md:text-lg lg:text-xl w-1/2 text-right self-center">S${formattedSum(info.currentlyRaised)}</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">of S${formattedSum(info.goal)} raised</p>
                    </div>
                    <div className="flex flex-row space-x-4 w-full">
                        <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right">{round(info.currentlyRaised/info.goal * 100)}%</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Raised</p>
                    </div>
                    <div className="flex flex-row space-x-4 w-full">
                        <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right">{info.sharesAllocated}%</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Equity Stake</p>
                    </div>
                    <div className="flex flex-row space-x-4 w-full">
                        <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right">{ info.time }</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Hours left</p>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-row space-x-2 w-1/2">
                            <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right self-center">S${ formattedSum(info.amountInvested) }</p>
                            <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Amount Invested</p>
                        </div>
                        <div className="flex flex-row space-x-2 w-1/2">
                            <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right self-center">{ round(info.amountInvested/info.goal * info.sharesAllocated) }%</p>
                            <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Equity Stake</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-1/3 lg:w-1/2 py-4">
                    <img src={info.image} alt="Profile Picture" />
                </div>
            </div>
        </>
    )
}

SupportedStartupItem.propTypes = {
    info: PropTypes.object
}

export default SupportedStartupItem;