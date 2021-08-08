import React, { useState, useEffect } from "react";
import SupportedStartups from "./Overview/SupportedStartups";
// import PlantPeace from './Overview/PlantPeace.svg'
// import Gover from './Overview/Gover.svg'
// import ShareNow from './Overview/ShareNow.svg'
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import ConfigData from "../../../../config";

// Redux
import { useSelector } from 'react-redux'
import { getID, getToken } from '../../../../store/auth'

// const sampleData = [
//     {
//         "name": "ShareNow",
//         "goal": 500000,
//         "currentlyRaised": 200000,
//         "sharesAllocated": 20,
//         // Using Time as Hours Left instead of EndDate - NOW for sample
//         "time": 47,
//         "amountInvested": 1000,
//         "id": 1,
//         "image": ShareNow,
//         "status": "Ongoing",
//         "startupId": 1
//     },
//     {
//         "name": "PlantPeace",
//         "goal": 140000,
//         "currentlyRaised": 80000,
//         "sharesAllocated": 15,
//         // Using Time as Hours Left instead of EndDate - NOW for sample
//         "time": 27,
//         "amountInvested": 10000,
//         "id": 2,
//         "image": PlantPeace,
//         "status": "Ongoing",
//         "startupId": 2
//     },
//     {
//         "name": "Gover",
//         "goal": 375000,
//         "currentlyRaised": 300000,
//         "sharesAllocated": 15,
//         // Using Time as Hours Left instead of EndDate - NOW for sample
//         "time": 14,
//         "amountInvested": 5000,
//         "id": 3,
//         "image": Gover,
//         "status": "Ongoing",
//         "startupId": 3
//     }
// ]

function Overview( investedCampaigns ){
    const [filter, setFilter] = useState("LIVE")
    const [portfolioDetails, setPortfolioDetails] = useState([])
    const filteredData = portfolioDetails.filter((item) => item.campaign.campaignStatus === filter)

    // Redux useSelector
    const retailInvestorID = useSelector(getID)
    const accessToken = useSelector(getToken)

    useEffect( async () => {
        if (investedCampaigns.investedCampaigns.length != 0) {
            for (let i=0; i<investedCampaigns.investedCampaigns.length; i++) {
                const startupID = investedCampaigns.investedCampaigns[i].id
                
                const res = await fetch(ConfigData.SERVER_URL + '/db/retailInvestors/getStartup/' + startupID + "/" + retailInvestorID, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
    
                if (!res.ok){
                    const response = await res.json()
                    throw new Error(response.error.message)
                }
                const startupDetails = await res.json()
                console.log(startupDetails)
                setPortfolioDetails(portfolioDetails => [...portfolioDetails, startupDetails])
            }
        }
    }, [investedCampaigns.investedCampaigns])

    console.log(portfolioDetails)

    function handleChange(event) {
        setFilter(event.target.value)
    }

    return (
        <>
            {
                investedCampaigns.investedCampaigns.length === 0 ? 
                    <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto xl:px-40 lg:px-24 md:px-12 sm:px-8">
                        <p className="font-Rubik text-xl">You have yet to invest in any campaigns.</p>
                    </div>
                :
                <>
                    <div className="flex flex-row justify-between space-x-4 self-stretch w-full">
                        <p className="text-xl sm:text-2xl md:text-5xl font-bold">Overview</p>
                        <select name="gender" className="rounded-xl border-2 placeholder-gray-400 px-2 py-2 xl:text-xl mb-4 mx-4 mt-1 font-Inter text-center text-xs sm:text-base"
                                onChange={(e) => handleChange(e)} defaultValue="Ongoing">
                            <option value="LIVE">Ongoing</option>
                            <option value="Successful">Successful</option>
                            <option value="FailedFundraising">Failed Fundraising</option>
                            <option value="FailedMilestones">Failed Milestones</option>
                        </select>
                    </div>
                    <br />
                    <div className="space-y-4">
                        <SupportedStartups data={filteredData} />
                    </div>
                    <br />
                    <PrimaryButton text="More" properties="self-end" />
                </>
            }
        </>
    )
}

export default Overview;