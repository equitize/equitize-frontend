import React, { useState } from "react";
import SupportedStartups from "./Overview/SupportedStartups";
import PlantPeace from './Overview/PlantPeace.svg'
import Gover from './Overview/Gover.svg'
import ShareNow from './Overview/ShareNow.svg'
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";

const sampleData = [
    {
        "name": "ShareNow",
        "goal": 500000,
        "currentlyRaised": 200000,
        "sharesAllocated": 20,
        // Using Time as Hours Left instead of EndDate - NOW for sample
        "time": 47,
        "amountInvested": 1000,
        "id": 1,
        "image": ShareNow,
        "status": "Ongoing",
        "startupId": 1
    },
    {
        "name": "PlantPeace",
        "goal": 140000,
        "currentlyRaised": 80000,
        "sharesAllocated": 15,
        // Using Time as Hours Left instead of EndDate - NOW for sample
        "time": 27,
        "amountInvested": 10000,
        "id": 2,
        "image": PlantPeace,
        "status": "Ongoing",
        "startupId": 2
    },
    {
        "name": "Gover",
        "goal": 375000,
        "currentlyRaised": 300000,
        "sharesAllocated": 15,
        // Using Time as Hours Left instead of EndDate - NOW for sample
        "time": 14,
        "amountInvested": 5000,
        "id": 3,
        "image": Gover,
        "status": "Ongoing",
        "startupId": 3
    }
]

function Overview(){
    const [filter, setFilter] = useState("Ongoing")
    const filteredData = sampleData.filter((item) => item.status === filter)

    function handleChange(event) {
        setFilter(event.target.value)
    }

    return (
        <>
            <div className="flex flex-row justify-between space-x-4 self-stretch w-full">
                <p className="text-xl sm:text-2xl md:text-5xl font-bold">Overview</p>
                <select name="gender" className="rounded-xl border-2 placeholder-gray-400 px-2 py-2 xl:text-xl mb-4 mx-4 mt-1 font-Inter text-center text-xs sm:text-base"
                        onChange={(e) => handleChange(e)} defaultValue="Ongoing">
                    <option value="Ongoing">Ongoing</option>
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
    )
}

export default Overview;