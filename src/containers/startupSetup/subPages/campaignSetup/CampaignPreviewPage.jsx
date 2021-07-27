import React, { useState } from "react";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import { getTailwindWidthFraction } from "../../../../helpers";
import StartupVideo from "../../../retailInvestor/startupCampaign/StartupVideo";
import CampaignTabs from "../../../retailInvestor/startupCampaign/CampaignTabs";
import CampaignDetails from "../../../retailInvestor/startupCampaign/subPages/campaignDetails/CampaignDetails";
import CampaignMilestones from "../../../retailInvestor/startupCampaign/subPages/campaignMilestones/CampaignMilestones";
import CampaignFAQs from "../../../retailInvestor/startupCampaign/subPages/campaignFAQs/CampaignFAQs";
import CampaignResearch from "../../../retailInvestor/startupCampaign/subPages/campaignResearch/CampaignResearch";
import ConfigData from "../../../../config";
import PropTypes from 'prop-types';

// React query
import { useQuery } from 'react-query'

// Redux
import { useSelector } from 'react-redux'
import { getToken } from '../../../../store/auth'

// React query fetch functions
const getStartupDetails = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/' + key.queryKey[1], {
        headers: {
            'Authorization': 'Bearer ' + key.queryKey[2]
        }
    })
    return await res.json()
}

const getStartupVideo = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/getSignedURLPlus/video/' + key.queryKey[1], {
        headers: {
            'Authorization': 'Bearer ' + key.queryKey[2]
        }
    })
    return res.json()
}

const getStartupPitchDeck = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/getSignedURLPlus/pitchDeck/' + key.queryKey[1], {
        headers: {
            'Authorization': 'Bearer ' + key.queryKey[2]
        }
    })
    return res.json()
}

function CampaignPreviewPage({ id }){
    const [isActiveTab, setIsActiveTab] = useState({
        first: true,
        second: false,
        third: false,
        fourth: false
    })

    const accessToken = useSelector(getToken)

    const { data, status } = useQuery(['viewStartupDetails', id, accessToken], getStartupDetails)
    // console.log(data)

    const videoData = useQuery(['startupVideo', id, accessToken], getStartupVideo)
    const pitchDeck = useQuery(['startupPitchDeck', id, accessToken], getStartupPitchDeck)

    function getProgressBarWidth() {
        if (status === 'success') {
            var percentageRaised = 40000/100000 * 100 // Sample
            var progressBarWidth = getTailwindWidthFraction(percentageRaised)
            return progressBarWidth
        }
    }
    // const percentageRaised = startupObject.fundedAmount/startupObject.campaignGoal * 100
    // const progressBarWidth = getTailwindWidthFraction(percentageRaised)

    return (
        <>
        { status === 'loading' && (
                <div>Loading...</div>
            )}

        { status === 'error' && (
                <div>Error fetching data</div>
            )}
        
        { status === 'success' && (
        <div className="container mx-auto flex flex-wrap flex-col items-center my-auto xl:px-40 lg:px-8 md:px-12 sm:px-8">
            <br />
            <div className="w-full flex flex-row justify-between">
                <p className="w-full text-center font-Rubik font-bold text-xl md:text-2xl lg:text-4xl">{data.companyName}</p>
            </div>
            <div className="w-full flex flex-row">
                <div className="w-full flex flex-col md:ml-3 space-y-2">
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
                
            </div>
        </div>
        )}
        </>
    )
}

CampaignPreviewPage.propTypes = {
    id: PropTypes.number
}


export default CampaignPreviewPage;