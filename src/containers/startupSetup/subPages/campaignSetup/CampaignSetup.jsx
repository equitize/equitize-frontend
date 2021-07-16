import React, { useEffect, useState } from "react";
import DropZone from "../../../../components/DropZone/DropZone";
import PrimaryTextArea from "../../../../components/PrimaryTextArea/PrimaryTextArea";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import ZoomSessionModal from "./modals/ZoomSessionModal";
import MilestoneModal from "./modals/MilestoneModal";
import ConfigData from "../../../../config";
import PrimaryInput from "../../../../components/PrimaryInput/PrimaryInput";
import moment from "moment";
import jwt_decode from "jwt-decode"

// React query
import { useQuery, useQueryClient } from 'react-query'

// For redux
import { useSelector } from 'react-redux'
import { getID, getToken } from '../../../../store/auth'

// React query fetch functions
const fetchStartupById = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/' + key.queryKey[1])
    return await res.json()
}

function CampaignSetup(){
    // Redux useSelector
    const startupId = useSelector(getID)
    const accessToken = useSelector(getToken)
    var decoded = jwt_decode(accessToken)
    console.log(decoded)

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

    const [campaignLaunchDate, setCampaignLaunchDate] = useState({
        date: "",
        time: ""
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

    const launchCampaign = async () => {

        const campaignStartDate = moment(campaignLaunchDate.date + "T" + campaignLaunchDate.time).format()
        const campaignEndDate = moment(campaignStartDate).add(1, 'M').format()

        const response = await fetch(ConfigData.SERVER_URL + '/db/startup/campaign/update/' + startupId, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                "startDate": campaignStartDate,
                "endDate": campaignEndDate
            }) 
        })

        const status = await response.status
        if (status === 200) {
            const res = await response.json()
            console.log(res)

        } else {
            const error = await response.json()
            console.log("Error", error)
        }
    }

    function setLaunchDate(key, value) {
        setCampaignLaunchDate(prevState => ({
            ...prevState,
            [key]: value
        }))
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
                    <PrimaryButton text="Submit" properties="self-end" className="test-submit" onClick={() => saveCampaignDescription()}/>
                </div>
                <br/>
                <br/>
                <div className="flex flex-wrap flex-col w-full">
                    <div className="flex flex-row justify-center items-center">
                        <p className="bg-secondary text-white font-bold px-2 py-2 rounded-xl text-center w-1/2 sm:w-1/3 text-sm sm:text-base">Campaign launch date</p>
                        <PrimaryInput placeholder="dd/mm/yy" properties="text-center w-1/2 sm:w-1/3 text-xs md:text-md" onChange={(e) => setLaunchDate("date", e.target.value)} type="date" />
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <p className="bg-secondary text-white font-bold px-2 py-2 rounded-xl text-center w-1/2 sm:w-1/3 text-sm sm:text-base">Campaign launch time</p>
                        <div className="w-1/2 items-stretch sm:w-1/3 flex flex-col sm:flex-row justify-between sm:items-center m-4">
                            <input className="rounded-xl w-1/2 bg-gray-100 placeholder-gray-400 font-Inter text-center py-2 text-xs sm:text-base"
                                    placeholder="0000" onChange={(e) => setLaunchDate("time", e.target.value)}
                                    type="time" />
                        </div>
                    </div>
                    <div className="flex flex-wrap self-center bg-gray-100 font-bold py-4 px-10 m-2 w-1/2 justify-center rounded-xl text-sm">
                        <p className="text-center place-self-center font-Inter">Note: Campaign end date will be 1 month from start date</p>
                    </div>
                    <PrimaryButton properties="self-end" text="Update" onClick={launchCampaign }/>
                </div>
            {/* )} */}
            
        </>
    )
}

export default CampaignSetup;