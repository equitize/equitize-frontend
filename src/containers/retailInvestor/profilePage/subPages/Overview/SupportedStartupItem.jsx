import React from "react";
import PropTypes from "prop-types";
import { formattedSum, round } from "../../../../../helpers";
import { useHistory } from "react-router-dom";
import ConfigData from "../../../../../config";
import { isLastHour } from "../../../../../helpers";
import moment from "moment";

// React query
import { useQuery } from 'react-query'

// Redux
import { useSelector } from 'react-redux'
import { getToken, getID } from '../../../../../store/auth'

const getStartupPhoto = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/retailInvestors/getSignedURL/profilePhoto/' + key.queryKey[1] + "/" + key.queryKey[2], {
        headers: {
            'Authorization': 'Bearer ' + key.queryKey[3]
        }
    })
    if (!res.ok){
        const response = await res.json()
        throw new Error(response.error.message)
    }
    return res.json()
}

function SupportedStartupItem({ info }){
    const history = useHistory()
    const accessToken = useSelector(getToken)
    const retailInvestorID = useSelector(getID)

    const startupPhoto = useQuery(['startupPhoto', info.id, retailInvestorID, accessToken], getStartupPhoto)
    // console.log(startupPhoto.data)

    // Find number of days/hours/mins left
    const now = moment()
    const exp = moment(info.campaign.endDate)
    const days = exp.diff(now, 'days');
    const hours = exp.subtract(days, 'days').diff(now, 'hours');
    const minutes = exp.subtract(hours, 'hours').diff(now, 'minutes');

    function visitStartupCampaign(){
        history.push(`/startup/${info.id}`)
    }

    return(
        <>
            <div className="border-4 border-gray-300 rounded-xl w-full flex flex-row cursor-pointer px-1 md:px-2" onClick={visitStartupCampaign}>
                <div className="flex flex-col w-2/3 lg:w-1/2 py-4 items-center space-y-2">
                    <h2 className="text-3xl font-bold text-center">{info.companyName}</h2>
                    <div className="flex flex-row space-x-4 w-full">
                        <p className="font-Inter text-green-500 font-bold text-sm md:text-lg lg:text-xl w-1/2 text-right self-center">S${formattedSum(info.campaign.currentlyRaised)}</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">of S${formattedSum(info.campaign.goal)} raised</p>
                    </div>
                    <div className="flex flex-row space-x-4 w-full">
                        <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right">{round(info.campaign.currentlyRaised/info.campaign.goal * 100)}%</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Raised</p>
                    </div>
                    <div className="flex flex-row space-x-4 w-full">
                        <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right">{info.campaign.sharesAllocated}%</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Equity Stake</p>
                    </div>
                    <div className="flex flex-row space-x-4 w-full">
                        <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right">{ info.time }</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-full self-center">
                            { isLastHour(days, hours) ? 
                                <>
                                    {minutes} minutes left
                                </>
                            : 
                            <>
                                {days} days & {hours} hours left
                            </>
                            }
                        </p>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-row space-x-2 w-1/2">
                            <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right self-center">S${ formattedSum(info.campaign.currentlyRaised) }</p>
                            <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Amount Invested</p>
                        </div>
                        <div className="flex flex-row space-x-2 w-1/2">
                            <p className="font-Inter text-sm md:text-lg lg:text-xl w-1/2 text-right self-center">{ round(info.campaign.currentlyRaised/info.campaign.goal * info.campaign.sharesAllocated) }%</p>
                            <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 w-1/2 self-center">Equity Stake</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-1/3 lg:w-1/2 py-4">
                    <img className="h-32 sm:h-48 lg:h-72 w-full rounded-lg object-cover" src={ startupPhoto.status === "success" ? startupPhoto.data.signedURL : null} alt="Profile Picture" />
                </div>
            </div>
        </>
    )
}

SupportedStartupItem.propTypes = {
    info: PropTypes.object
}

export default SupportedStartupItem;