import React, { useState } from "react";
import DropZone from "../../../../components/DropZone/DropZone";
import PrimaryTextArea from "../../../../components/PrimaryTextArea/PrimaryTextArea";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import ZoomSessionModal from "./modals/ZoomSessionModal";
import MilestoneModal from "./modals/MilestoneModal";

// React query
import { useQuery } from 'react-query'

// For redux
import { useSelector } from 'react-redux'
import { getStartupId } from '../../../../store/auth'

const fetchCampaign = async (key) => {
    const res = await fetch('http://localhost:8080/api/db/startup/getCampaign/' + key.queryKey[1])
    return res.json()
}

function CampaignSetup(){
    let goal = 500000
    let sharesAllocated = 10
    let tokensMinted = 1000000

    // Redux useSelector
    const startupId = useSelector(getStartupId)

    const [campaignDetails, setCampaignDetails] = useState({
        campaignDescription: "",
        zoomDetails: {
            date: "",
            startTime: "",
            endTime: ""
        },
        campaignGoal: {
            goal: goal,
            sharesAllocated: sharesAllocated,
            tokensMinted: tokensMinted
        },
        milestones:[]
    })

    // React query fetch request
    const { data, status } = useQuery(['campaignGoal', startupId], fetchCampaign, {
        refetchInterval: 1000
    })
    
    if (data) {
        if (data[0]) {
            console.log(data[0])
            goal = data[0].goal
            sharesAllocated = data[0].sharesAllocated
            tokensMinted = data[0].tokensMinted

            const campaignGoalSubmission = {goal, sharesAllocated, tokensMinted}
            campaignDetails.campaignGoal = campaignGoalSubmission
        }
    }
    console.log("STATUS: ", status)

    function setCampaignDescription(value){
        setCampaignDetails(prevState => ({
            ...prevState,
            campaignDescription: value
        }))
    }

    function setZoomDetails(key, value){
        setCampaignDetails(prevState => ({
            ...prevState,
            zoomDetails: {
                ...prevState.zoomDetails,
                [key]: value
            }
        }))
    }

    function addMilestonesDetails(milestone){
        setCampaignDetails(prevState => ({
            ...prevState,
            milestones: [
                ...prevState.milestones,
                milestone
            ]
        }))
    }

    function editMilestoneFunc(index){
        function editSelectedMilestone(milestone){
            let currentMilestones = campaignDetails.milestones
            currentMilestones[index] = milestone

            setCampaignDetails(prevState => ({
                ...prevState,
                milestones: [
                    ...currentMilestones
                ]
            }))
        }
        return editSelectedMilestone;
    }

    function deleteMilestoneFunc(index){
        function deleteSelectedMilestone(){
            let currentMilestones = campaignDetails.milestones
            currentMilestones.splice(index, 1)

            setCampaignDetails(prevState => ({
                ...prevState,
                milestones: [
                    ...currentMilestones
                ]
            }))
        }
        return deleteSelectedMilestone;
    }

    function setCampaignGoal(campaignGoalObj){
        setCampaignDetails(prevState => ({
            ...prevState,
            campaignGoal: campaignGoalObj
        }))

        console.log(campaignDetails.campaignGoal)
    }

    const saveCampaignDescription = async () => {
        console.log(campaignDetails.campaignDescription)
        // TODO More detailed logic such as no selection and error handling

        // API to update/set campaign description
        //TODO: Hardcoded baseURL
        const response = await fetch('http://localhost:8080/api/db/startup/campaign/update/' + startupId, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({ "campaignDescription": campaignDetails.campaignDescription }) 
        })

        const data = await response.json()
        console.log(data)
    }

    const submitZoomDetails = async () => {

        const dateTrimmed = campaignDetails.zoomDetails.date.replace(/-/g, "")
        const dateFormatted = dateTrimmed.slice(6,8) + dateTrimmed.slice(4, 6) + dateTrimmed.slice(0, 4)
        
        const data = {
            zoomDatetime: campaignDetails.zoomDetails.startTime + ', ' + campaignDetails.zoomDetails.endTime + ', ' + dateFormatted
        }

        // //TODO: Hardcoded baseURL
        const response = await fetch('http://localhost:8080/api/db/startup/' + startupId, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(data) 
        })

        const res = await response.json()
        console.log(res)
    }

    return (
        <>
            <div className="bg-white px-6 sm:px-24 py-16 rounded-xl space-y-4 shadow-lg h-full w-full flex flex-wrap flex-col items-center">
                <DropZone placeHolderText="Drop Video Material (MP4, MOV)" acceptedFileTypes="video/*" endPoint="/startup/video/" startupId={startupId} />
                <DropZone placeHolderText="Drop Pitch Deck Materials (pdf, jpg)" acceptedFileTypes=".jpg, .pdf" endPoint="/startup/pitchDeck/" startupId={startupId} />
                <PrimaryTextArea placeholder="Campaign Description" onChangeFunc={setCampaignDescription}
                                 properties="w-full h-40" value={campaignDetails.campaignDescription} />
                <MilestoneModal addMilestonesFunc={addMilestonesDetails} details={campaignDetails}
                                editMilestoneFunc={editMilestoneFunc} deleteMilestoneFunc={deleteMilestoneFunc}
                                setCampaignGoal={setCampaignGoal} />
                <ZoomSessionModal onChangeFunc={setZoomDetails} details={campaignDetails.zoomDetails} onSubmitFunc={submitZoomDetails} />
                <br />
                <br />
                <br />
                <PrimaryButton text="Submit" properties="self-end" onClick={saveCampaignDescription}/>
            </div>
        </>
    )
}

export default CampaignSetup;