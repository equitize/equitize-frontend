import React, { useEffect, useState } from "react";
import DropZone from "../../../../components/DropZone/DropZone";
import PrimaryTextArea from "../../../../components/PrimaryTextArea/PrimaryTextArea";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import ZoomSessionModal from "./modals/ZoomSessionModal";
import MilestoneModal from "./modals/MilestoneModal";
import ConfigData from "../../../../config";

// React query
import { useQuery, useQueryClient } from 'react-query'

// For redux
import { useSelector } from 'react-redux'
import { getID } from '../../../../store/auth'

// React query fetch functions
const fetchStartupById = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/' + key.queryKey[1])
    return await res.json()
}

function CampaignSetup(){
    // Redux useSelector
    const startupId = useSelector(getID)
    const queryClient = useQueryClient()

    const [campaignDetails, setCampaignDetails] = useState({
        campaignDescription: "",
        zoomDetails: {
            date: "",
            startTime: "",
            endTime: ""
        },
        campaignGoal: {
            goal: 500000,
            sharesAllocated: 10,
            tokensMinted: 1000000
        },
        milestones:[]
    })

    // React query fetch requests
    const { data } = useQuery(['startupDetails', startupId], fetchStartupById, {
        enabled: true
    })

    useEffect(() => {
        if (data !== undefined){
            console.log(data)
            if (data?.campaign?.goal != undefined) {
                setCampaignGoal({
                    goal: data.campaign.goal,
                    sharesAllocated: data.campaign.sharesAllocated,
                    tokensMinted: data.campaign.tokensMinted
                })
            }

            if (data?.campaign?.zoomDatetime != undefined){
                const zoomDateTimeArray = data.campaign.zoomDatetime.split(",")
                setZoomDetails({
                    date: zoomDateTimeArray[0],
                    startTime: zoomDateTimeArray[1],
                    endTime: zoomDateTimeArray[2]
                })
            }

            if(data?.milestones){
                setCampaignDetails(prevState => ({
                    ...prevState,
                    milestones: data.milestones
                }))
            }

            if (data?.campaign?.campaignDescription != null) {
                setCampaignDescription(data.campaign.campaignDescription)
            }
        }
    }, [data])

    function setCampaignDescription(value){
        setCampaignDetails(prevState => ({
            ...prevState,
            campaignDescription: value
        }))
    }

    function setZoomDetails(zoomDetailsObj){
        setCampaignDetails(prevState => ({
            ...prevState,
            zoomDetails: zoomDetailsObj
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
    }

    const saveCampaignDescription = async () => {
        console.log(campaignDetails.campaignDescription)
        // TODO More detailed logic such as no selection and error handling

        // API to update/set campaignDetails description
        const response = await fetch(ConfigData.SERVER_URL + '/db/startup/campaign/update/' + startupId, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({ "campaignDescription": campaignDetails.campaignDescription }) 
        })

        const data = await response.json()
        console.log(data)

        await queryClient.invalidateQueries('startupDetails')
    }

    const submitZoomDetails = async (newZoomDetails) => {
        const data = {
            zoomDatetime: newZoomDetails.date + ',' +  newZoomDetails.startTime + ',' + newZoomDetails.endTime
        }
        console.log(data)

        const response = await fetch(ConfigData.SERVER_URL + '/db/startup/campaign/update/' + startupId, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ~jwttoken~'
            },
            method: 'PUT',
            body: JSON.stringify(data) 
        })

        const res = await response.json()
        console.log(res)

        await queryClient.invalidateQueries('startupDetails')
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
                    <ZoomSessionModal details={campaignDetails.zoomDetails} onSubmitFunc={submitZoomDetails} startupId={startupId} />
                    <br />
                    <br />
                    <br />
                    <PrimaryButton text="Submit" properties="self-end" onClick={() => saveCampaignDescription()}/>
                </div>
            {/* )} */}
            
        </>
    )
}

export default CampaignSetup;