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


// React query fetch functions
const getStartupPhoto = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/getSignedURL/profilePhoto/' + key.queryKey[1])
    return res.json()
}

function StartupItem({ info }){
    const history = useHistory()
    let percentageRaised = info.campaign.currentlyRaised / info.campaign.goal * 100
    let progressBarWidth = getTailwindWidthFraction(percentageRaised)

    useEffect(() => {
        getProgressBarWidth()
    }, [])

    const getProgressBarWidth = () => {
        percentageRaised = info.campaign.currentlyRaised / info.campaign.goal * 100
        progressBarWidth = getTailwindWidthFraction(percentageRaised)
    }

    const featuredPhoto = useQuery(['featuredStartupPhoto', info.id], getStartupPhoto)

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
            <div className="py-4 space-y-3">
                <img src={ featuredPhoto.status === "success" ? featuredPhoto.data.signedURL : null } className="h-32 sm:h-48 lg:h-72 cursor-pointer m-auto" alt="Startup Image" onClick={viewStartup}/>
                <p className="font-bold font-Rubik text-xl md:text-2xl lg:text-4xl text-center">{info.companyName}</p>
                <br />
                <p className="font-Inter text-sm md:font-lg lg:text-xl">{info.profileDescription}</p>
                <ProgressBar width={progressBarWidth} />
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/2 space-y-2">
                        <p className="font-Inter text-xs md:text-base"><span className="text-green-500">S${info.campaign.currentlyRaised}</span> funded</p>
                        <p className="font-Inter text-xs md:text-base"><span className="text-secondary">{percentageRaised}%</span> Raised</p>
                    </div>
                    <div className="flex flex-col w-1/2 space-y-2">
                        <p className="font-Inter text-xs md:text-base"><span className="text-active-purple">{info.campaign.sharesAllocated}%</span> Equity Stake</p>
                        <p className="font-Inter text-xs md:text-base"><span className="text-active-purple"></span>
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
        </>
    )
}

StartupItem.propTypes = {
    info: PropTypes.object
}

export default StartupItem;