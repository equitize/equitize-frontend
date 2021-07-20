import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { getTailwindWidthFraction } from "../../helpers";
import { useHistory } from "react-router-dom";
import ConfigData from "../../config";
import moment from "moment";

// Default image
import MeetupMouse from './tempImages/MeetupMouse.svg'

// React query
import { useQuery } from 'react-query'
import { useEffect } from "react";

// React query fetch functions
const getStartupPhoto = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/getSignedURL/profilePhoto/' + key.queryKey[1])
    return res.json()
}

function FeaturedStartup({ info }){
    const history = useHistory()

    var percentageRaised = info.campaign.currentlyRaised / info.campaign.goal * 100
    var progressBarWidth = getTailwindWidthFraction(percentageRaised)

    // Find number of days/hours/mins left
    const now = moment()
    const exp = moment(info.campaign.endDate)
    const days = exp.diff(now, 'days');
    const hours = exp.subtract(days, 'days').diff(now, 'hours');
    const minutes = exp.subtract(hours, 'hours').diff(now, 'minutes');

    function isLastHour() {
        if (days <= 0 && hours <= 0) {
            return true
        }
        else return false
    }

    useEffect(() => {
        getProgressBarWidth()
    }, [])

    const getProgressBarWidth = () => {
        percentageRaised = info.campaign.currentlyRaised / info.campaign.goal * 100
        progressBarWidth = getTailwindWidthFraction(percentageRaised)
    }


    const featuredPhoto = useQuery(['featuredStartupPhoto', info.id], getStartupPhoto)
    // console.log(featuredPhoto.data)

    function viewStartup(){
        const URL = `/startup/${info.id}`
        history.push(URL)
    }

    return (
        <>
            <p className="font-Inter text-xl">Featured Startup</p>
            <div className="flex flex-col md:flex-row space-x22 group border-indigo-500 border-opacity-25 hover:bg-white hover:shadow-lg hover:border-transparent border rounded-lg cursor-pointer" onClick={viewStartup}>
                <img src={ featuredPhoto.status === "success" ? featuredPhoto.data.signedURL : MeetupMouse } className="md:w-1/3 lg:w-1/2 rounded-md mx-6 my-5" alt="Featured Startup Image" />
                <div className="md:w-1/2 lg:w-full flex flex-col mr-6 my-5">
                    <p className="font-bold font-Rubik text-xl md:text-2xl lg:text-4xl text-black group-hover:text-gray-600">{info.companyName}</p>
                    <br />
                    <p className="font-Inter md:text-xl text-black group-hover:text-gray-500">{info.profileDescription}</p>
                    <ProgressBar width={progressBarWidth} />
                    <div className="flex flex-row">
                        <div className="flex flex-col w-1/2">
                            <p className="font-Inter text-sm md:text-md"><span className="text-green-500">S${info.campaign.currentlyRaised}</span> funded</p>
                            <p className="font-Inter text-sm md:text-md"><span className="text-secondary">{percentageRaised}%</span> Raised</p>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <p className="font-Inter text-sm md:text-md"><span className="text-active-purple">{info.campaign.sharesAllocated}%</span> Equity Stake</p>
                            <p className="font-Inter text-sm md:text-md"><span className="text-active-purple"></span>
                                { isLastHour() ? 
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

FeaturedStartup.propTypes = {
    info: PropTypes.object.isRequired
}

export default FeaturedStartup;