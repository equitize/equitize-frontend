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

// React query fetch functions
const fetchStartupById = async (key) => {
    const res = await fetch('http://localhost:8080/api/db/startup/' + key.queryKey[1])
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

    // React query fetch requests
    const { data, refetch } = useQuery(['startupDetails', startupId], fetchStartupById, {
        enabled: false
    })

    if (data) {
        if (data.campaigns[0]) {
            if (data.campaigns[0].goal) {
                goal = data.campaigns[0].goal
                sharesAllocated = data.campaigns[0].sharesAllocated
                tokensMinted = data.campaigns[0].tokensMinted

                const campaignGoalSubmission = {goal, sharesAllocated, tokensMinted}
                campaignDetails.campaignGoal = campaignGoalSubmission
            }
        }
        
    }

    const updateZoomDatetimeQuery = async () => {
        const res = await fetch('http://localhost:8080/api/db/startup/' + startupId)
        const result = await res.json()

        if (result.campaigns[0] != null) {
            if (result.campaigns[0].zoomDatetime != null) {
                const zoomDateTimeArray = result.campaigns[0].zoomDatetime.split(",")
                campaignDetails.zoomDetails.date = zoomDateTimeArray[0]
                campaignDetails.zoomDetails.startTime = zoomDateTimeArray[1]
                campaignDetails.zoomDetails.endTime = zoomDateTimeArray[2]
            }

            if (result.campaigns[0].campaignDescription != null) {
                campaignDetails.campaignDescription = result.campaigns[0].campaignDescription
            }
        }

    }

    if (campaignDetails.zoomDetails.date === "") {
        updateZoomDatetimeQuery()
        refetch()
    }

    const updateMilestonesQuery = async () => {
        const res = await fetch('http://localhost:8080/api/db/startup/' + startupId)
        const result = await res.json()
        campaignDetails.milestones = result.milestones
    }

    if (campaignDetails.milestones.length === 0) {
        updateMilestonesQuery()
    }

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

        // API to update/set campaignDetails description
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
        
        const data = {
            zoomDatetime: campaignDetails.zoomDetails.date + ',' +  campaignDetails.zoomDetails.startTime + ',' + campaignDetails.zoomDetails.endTime
        }

        // //TODO: Hardcoded baseURL
        const response = await fetch('http://localhost:8080/api/db/startup/campaign/update/' + startupId, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ~jwttoken~'
            },
            method: 'PUT',
            body: JSON.stringify(data)
        })

        const res = await response.json()
        console.log(res)
    }

    return (
        <>
            {/* { status === 'loading' && (
                <div>Updating...</div>
            )} */}

            {/* { status === 'success' && ( */}
                <div className="bg-white px-6 sm:px-24 py-16 rounded-xl space-y-4 shadow-lg h-full w-full flex flex-wrap flex-col items-center">
                    <DropZone placeHolderText="Drop Video Material (MP4, MOV)" acceptedFileTypes="video/*" endPoint="video/" startupId={startupId} />
                    <DropZone placeHolderText="Drop Pitch Deck Materials (pdf, jpg)" acceptedFileTypes=".jpg, .pdf" endPoint="pitchDeck/" startupId={startupId} />
                    <PrimaryTextArea placeholder="Campaign Description" onChangeFunc={setCampaignDescription}
                                    properties="w-full h-40" value={campaignDetails.campaignDescription} />
                    <MilestoneModal addMilestonesFunc={addMilestonesDetails} details={campaignDetails}
                                    editMilestoneFunc={editMilestoneFunc} deleteMilestoneFunc={deleteMilestoneFunc}
                                    setCampaignGoal={setCampaignGoal} />
                    <ZoomSessionModal onChangeFunc={setZoomDetails} details={campaignDetails.zoomDetails} onSubmitFunc={submitZoomDetails} startupId={startupId} />
                    <br />
                    <br />
                    <br />
                    <PrimaryButton text="Submit" properties="self-end" onClick={saveCampaignDescription}/>
                </div>
            {/* )} */}
            
        </>
    )
}

export default CampaignSetup;