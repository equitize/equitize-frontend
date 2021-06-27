import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { getTailwindWidthFraction } from "../../helpers";
import { useHistory } from "react-router-dom";

// Default image
import MeetupMouse from './tempImages/MeetupMouse.svg'

// React query
import { useQuery } from 'react-query'
import { useEffect } from "react";

// React query fetch functions
const getStartupPhoto = async (key) => {
    const res = await fetch('http://localhost:8080/api/db/startup/getSignedURL/profilePhoto/' + key.queryKey[1])
    return res.json()
}

function FeaturedStartup({ info }){
    const history = useHistory()
    console.log(info)
    // const percentageRaised = info.fundedAmount/info.campaignGoal * 100
    // const percentageRaised = info.campaigns[0].currentlyRaised / info.campaigns[0].goal * 100
    // const progressBarWidth = getTailwindWidthFraction(percentageRaised)
    let percentageRaised = 20
    let progressBarWidth = 0

    useEffect(() => {
        getProgressBarWidth()
    }, [])

    const getProgressBarWidth = () => {
        percentageRaised = info.campaigns[0].currentlyRaised / info.campaigns[0].goal * 100
        progressBarWidth = getTailwindWidthFraction(percentageRaised)
    }


    const featuredPhoto = useQuery(['featuredStartupPhoto', info.id], getStartupPhoto)
    console.log(featuredPhoto.data)

    function viewStartup(){
        const URL = `/startup/${info.id}`
        history.push(URL)
    }

    return (
        <>
            <p className="font-Inter text-xl">Featured Startup</p>
            <div className="flex flex-col md:flex-row space-x-2">
                <img src={ featuredPhoto.status === "success" ? featuredPhoto.data.signedURL : MeetupMouse } className="md:w-1/2 lg:w-2/3 cursor-pointer" alt="Featured Startup Image" onClick={viewStartup}/>
                <div className="md:w-1/2 lg:w-1/3 flex flex-col">
                    <p className="font-bold font-Rubik text-xl md:text-2xl lg:text-4xl">{info.companyName}</p>
                    <br />
                    <p className="font-Inter md:text-xl">{info.profileDescription}</p>
                    <ProgressBar width={progressBarWidth} />
                    <div className="flex flex-row">
                        <div className="flex flex-col w-1/2">
                            <p className="font-Inter text-sm md:text-md"><span className="text-green-500">S${info.campaigns[0].currentlyRaised}</span> funded</p>
                            <p className="font-Inter text-sm md:text-md"><span className="text-secondary">{percentageRaised}%</span> Raised</p>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <p className="font-Inter text-sm md:text-md"><span className="text-active-purple">{info.campaigns[0].sharesAllocated}%</span> Equity Stake</p>
                            <p className="font-Inter text-sm md:text-md"><span className="text-active-purple">{info.campaigns[0].endDate}</span> Hours left</p>
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