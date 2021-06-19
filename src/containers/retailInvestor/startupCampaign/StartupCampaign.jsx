import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import MeetupMouse from "../../retailInvestorHomePage/tempImages/MeetupMouse.svg";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import InvestmentDetails from "./InvestmentDetails";
import ScoreCard from "./ScoreCard";
import ZoomCampaignDetails from "./ZoomCampaignDetails";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { getTailwindWidthFraction } from "../../../helpers";
import StartupVideo from "./StartupVideo";
import CampaignTabs from "./CampaignTabs";
import CampaignDetails from "./subPages/campaignDetails/CampaignDetails";
import CampaignMilestones from "./subPages/campaignMilestones/CampaignMilestones";
import CampaignFAQs from "./subPages/campaignFAQs/CampaignFAQs";
import CampaignResearch from "./subPages/campaignResearch/CampaignResearch";
//TODO Need to store when retrieving from API
import tempVideo from "./tempVideo.mp4"
//TODO Need to store when retrieving from API
import tempPDF from "./temp.pdf"

// React query
import { useQuery } from 'react-query'

// React query fetch functions
const viewStartupDetails = async (key) => {
    const res = await fetch('http://localhost:8080/api/db/startup/' + key.queryKey[1])
    return res.json()
}

function StartupCampaign(){
    let { id } = useParams()
    const history = useHistory()
    const [isActiveTab, setIsActiveTab] = useState({
        first: true,
        second: false,
        third: false,
        fourth: false
    })

    const { data, status } = useQuery(['viewStartupDetails', id], viewStartupDetails)
    console.log(status, data)

    // TODO CALL API FOR DATA
    const startupObject = {
        name: "Meetup Mouse",
        description: "Meetup Mouse suggests the BEST hand-picked places for your group’s needs so you and your friends NEVER worry about where to eat again!",
        fundedAmount: 200000,
        sharesAllocated: "20",
        campaignGoal: 500000,
        endTime: "47",
        id: 1,
        imageLink: MeetupMouse
    }

    const percentageRaised = startupObject.fundedAmount/startupObject.campaignGoal * 100
    const progressBarWidth = getTailwindWidthFraction(percentageRaised)

    const ratings = {
        teamSynergy: 8,
        innovation: 8,
        creativity: 7
    }

    // TODO Figure out the format for this, can be just a single key dateTime as well
    const zoomSessions = [
        {
            id:0,
            date: "14th August 2021",
            time: "2000",
            zoomLink: ""
        },
        {
            id:1,
            date: "15th August 2021",
            time: "2030",
            zoomLink: ""
        }
    ]

    const campaignMilestones = [
        {
            id: 0,
            title: "Complete first prototype",
            date: "23/01/21",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis blandit enim, ac fringilla dui.",
            percentageFunds: 15
        },
        {
            id: 1,
            title: "Complete second prototype",
            date: "13/06/21",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
            percentageFunds: 40
        }
    ]

    function returnToHomePage(){
        history.push("/home")
    }

    return (
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <br />
            <div className="w-full flex flex-row justify-between">
                <div className="w-1/3">
                    <PrimaryButton text="Back" properties="lg:px-10 self-start" onClick={returnToHomePage}/>
                </div>
                <p className="w-1/3 text-center font-Rubik font-bold text-xl md:text-2xl lg:text-4xl">{startupObject.name}</p>
                <div className="w-1/3"></div>
            </div>
            <div className="w-full flex flex-row">
                <div className="w-2/3 flex flex-col md:ml-3 space-y-2">
                    <br />
                    <StartupVideo video={tempVideo}/>
                    <ProgressBar width={progressBarWidth} />
                    <CampaignTabs setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab}/>
                    <br/>
                    {
                        isActiveTab.first ?
                            <CampaignDetails campaignPDF={tempPDF} />
                            : null
                    }
                    {
                        isActiveTab.second ?
                            <CampaignMilestones startupObject={startupObject} campaignMilestones={campaignMilestones}/>
                            : null
                    }
                    {
                        isActiveTab.third ?
                            <CampaignFAQs />
                            : null
                    }
                    {
                        isActiveTab.fourth ?
                            <CampaignResearch />
                            : null
                    }
                </div>
                <div className="w-1/3 flex flex-col">
                    <InvestmentDetails info={startupObject} />
                    <br />
                    <ScoreCard ratings={ratings}/>
                    <br />
                    <ZoomCampaignDetails zoomSessions={zoomSessions} />
                </div>
            </div>
        </div>
    )
}


export default StartupCampaign;