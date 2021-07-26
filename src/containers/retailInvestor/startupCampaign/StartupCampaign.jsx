import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import ConfigData from "../../../config";

// React query
import { useQuery } from 'react-query'

// React query fetch functions
const getStartupDetails = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/' + key.queryKey[1])
    if (!res.ok){
        const response = await res.json()
        throw new Error(response.error.message)
    }
    return res.json()
}

const getStartupVideo = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/getSignedURLPlus/video/' + key.queryKey[1])
    if (!res.ok){
        const response = await res.json()
        throw new Error(response.error.message)
    }
    return res.json()
}

const getStartupPitchDeck = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/getSignedURLPlus/pitchDeck/' + key.queryKey[1])
    if (!res.ok){
        const response = await res.json()
        throw new Error(response.error.message)
    }
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

    const { data, status, error } = useQuery(['viewStartupDetails', id], getStartupDetails)
    console.log(data)

    const videoData = useQuery(['startupVideo', id], getStartupVideo)
    const pitchDeck = useQuery(['startupPitchDeck', id], getStartupPitchDeck)

    function getProgressBarWidth() {
        if (status === 'success') {
            let percentageRaised = data.campaign.currentlyRaised / data.campaign.goal * 100
            return getTailwindWidthFraction(percentageRaised)
        }
    }
    // const percentageRaised = startupObject.fundedAmount/startupObject.campaignGoal * 100
    // const progressBarWidth = getTailwindWidthFraction(percentageRaised)

    //TODO: Hardcoded scorecard
    const ratings = {
        teamSynergy: 8,
        innovation: 8,
        creativity: 7
    }

    function returnToHomePage(){
        history.push("/home")
    }

    return (
        <>
        { status === 'loading' && (
                <div>Loading...</div>
        )}

        { status === 'error' && (
                <div>{error.message || "Unexpected Error Occurred"}</div>
        )}
        
        { status === 'success' && (
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <br />
            <div className="w-full flex flex-row justify-between">
                <div className="w-1/3">
                    <PrimaryButton text="Back" properties="lg:px-10 self-start" onClick={returnToHomePage}/>
                </div>
                <p className="w-1/3 text-center font-Rubik font-bold text-xl md:text-2xl lg:text-4xl">{data.companyName}</p>
                <div className="w-1/3"></div>
            </div>
            <div className="w-full flex flex-row">
                <div className="w-2/3 flex flex-col md:ml-3 space-y-2">
                    <br />
                    <StartupVideo video={ videoData.status === "success" ? videoData.data.signedURL : null}/>
                    <ProgressBar width={getProgressBarWidth()} />
                    <CampaignTabs setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab}/>
                    <br/>
                    {
                        isActiveTab.first ?
                            <CampaignDetails campaignPDF={ pitchDeck.status === "success" ? pitchDeck.data.signedURL : null } />
                            : null
                    }
                    {
                        isActiveTab.second ?
                            <CampaignMilestones campaign={ data.campaign } campaignMilestones={data.milestones}/>
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
                    <InvestmentDetails info={ status === "success" ? { campaignDetails: data.campaign, startupId: data.id } : null } />
                    <br />
                    <ScoreCard ratings={ratings}/>
                    <br />
                    <ZoomCampaignDetails zoomSessions={ status === "success" ? data.campaign.zoomDatetime : null } />
                </div>
            </div>
        </div>
        )}
        </>
    )
}


export default StartupCampaign;