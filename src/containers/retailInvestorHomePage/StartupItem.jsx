import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { getTailwindWidthFraction } from "../../helpers";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ConfigData from "../../config";
import moment from "moment";
import { isLastHour } from "../../helpers";

// React query
import { useQuery } from 'react-query'

// For redux
import { useSelector } from 'react-redux'
import { getToken, getID } from '../../store/auth'

// React query fetch functions
const getStartupPhoto = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/retailInvestors/getSignedURL/profilePhoto/' + key.queryKey[1] + "/" + key.queryKey[2], {
        headers: {
            'Authorization': 'Bearer ' + key.queryKey[3],
        },
    })
    return res.json()
}

function StartupItem({ info }){
    const history = useHistory()
    const accessToken = useSelector(getToken)
    const retailInvestorID = useSelector(getID)
    let percentageRaised = info.campaign.currentlyRaised / info.campaign.goal * 100
    let progressBarWidth = getTailwindWidthFraction(percentageRaised)

    useEffect(() => {
        getProgressBarWidth()
    }, [])

    const getProgressBarWidth = () => {
        percentageRaised = info.campaign.currentlyRaised / info.campaign.goal * 100
        progressBarWidth = getTailwindWidthFraction(percentageRaised)
    }

    const featuredPhoto = useQuery(['featuredStartupPhoto', info.id, retailInvestorID, accessToken], getStartupPhoto)

    // Find number of days/hours/mins left
    const now = moment()
    const exp = moment(info.campaign.endDate)
    const days = exp.diff(now, 'days');
    const hours = exp.subtract(days, 'days').diff(now, 'hours');
    const minutes = exp.subtract(hours, 'hours').diff(now, 'minutes');

    function viewStartup(){
        const URL = `/startup/${info.id}`
        history.push(URL)
    }

    return (
        <>
            <div className="h-full space-y-2 group border-indigo-500 border-opacity-25 hover:bg-white hover:shadow-lg hover:border-transparent border rounded-lg cursor-pointer" onClick={viewStartup}>
                <img src={ featuredPhoto.status === "success" ? featuredPhoto.data.signedURL : null } className="h-32 sm:h-48 lg:h-56 w-full rounded-t-lg object-cover" alt="Startup Image"/>
                <p className="font-bold font-Rubik text-xl md:text-xl lg:text-2xl text-center text-black group-hover:text-gray-900">{info.companyName}</p>
                <div className="mx-6 my-5">
                    <p className="font-Inter text-sm lg:text-lg text-black group-hover:text-gray-500">{info.profileDescription}</p>
                    <ProgressBar width={progressBarWidth}/>
                    <div className="flex flex-row">
                        <div className="flex flex-col w-1/2 mx-1 space-y-1">
                            <p className="font-Inter text-xs md:text-base flex-auto"><span className="text-green-500">S${info.campaign.currentlyRaised}</span> funded</p>
                            <p className="font-Inter text-xs md:text-base flex-auto"><span className="text-secondary">{percentageRaised}%</span> Raised</p>
                        </div>
                        <div className="flex flex-col w-1/2 mx-1 space-y-1 mb-2">
                            <p className="font-Inter text-xs md:text-base flex-auto"><span className="text-active-purple">{info.campaign.sharesAllocated}%</span> Equity Stake</p>
                            <p className="font-Inter text-xs md:text-base flex-auto"><span className="text-active-purple"></span>
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