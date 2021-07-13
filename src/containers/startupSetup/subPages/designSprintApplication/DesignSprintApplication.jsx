import React, {useEffect, useState} from "react";
import SprintImage from './sprint.svg'
import DesignSprintItem from "./DesignSprintItem";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import { getKeyByValue } from "../../../../helpers";
import { useHistory } from "react-router-dom";
import PrimaryInput from "../../../../components/PrimaryInput/PrimaryInput";
import moment from "moment";
import ConfigData from "../../../../config";

// For redux
import { useSelector } from 'react-redux'
import { getID } from '../../../../store/auth'

function DesignSprintApplication(){
    const [selected, setSelected] = useState(null)
    const [sprintPeriod, setSprintPeriod] = useState(null)
    const history = useHistory()

    // Redux useSelector
    const startupId = useSelector(getID)

    function selectSprint(id){
        const selectedSprint = getKeyByValue(selected, true)

        if (selectedSprint && id !== selectedSprint){
            setSelected(prevState => ({
                ...prevState,
                [id]: !prevState[id],
                [selectedSprint]: !prevState[selectedSprint]
            }))
        }
        else if (id !== selectedSprint){
            setSelected(prevState => ({
                ...prevState,
                [id]: !prevState[id],
            }))
        }
        else{
            console.log("Unexpected Selection occurred")
        }
    }

    useEffect(() =>{
            console.log("Obtained Design Sprint Dates from API")

            // TO replace with actual API and Image Links
            const sprintPeriodsJSON = {
                "sprintPeriods":[
                    {"date": "15th May - 21st May 2021" ,"id":0 },
                    {"date": "15th Aug - 21st Aug 2021" ,"id":1 },
                    {"date": "15th Dec - 21st Dec 2021" ,"id":2 }
                ]
            }
            setSprintPeriod(sprintPeriodsJSON.sprintPeriods)

            const initialSelectedObj = sprintPeriodsJSON.sprintPeriods.reduce((acc, cur)=>({ ...acc, [cur.id]: false }), {})
            setSelected(initialSelectedObj)
            console.log(selected)
        },[]
    )

    function saveDesignSprint(){
        console.log("Saving Design Sprint Dates")
        history.push('/startup/setup/completed')
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

    const [campaignLaunchDate, setCampaignLaunchDate] = useState({
        date: "",
        time: ""
    })

    function setLaunchDate(key, value) {
        setCampaignLaunchDate(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    return (
        <>
            <div className="bg-white px-6 sm:px-24 py-16 rounded-xl space-y-4 shadow-lg h-full w-full flex flex-wrap flex-col items-center divide-y divide-gray-500">
                <div className="flex flex-wrap flex-row items-center w-full">
                    <img src={SprintImage} alt="Image of Man Sprinting" className="w-1/6 xl:w-1/4" />
                    <div className="flex flex-col xl:w-3/4 w-5/6 items-center align-top space-y-4 md:space-y-12">
                        <p className="text-md md:text-2xl lg:text-3xl font-Rubik">Choose your Design Sprint Period</p>
                        <br/>
                        <br/>
                        {
                            sprintPeriod !== null ?
                                sprintPeriod.map((sprint, index) => (
                                    <DesignSprintItem key={index} text={sprint.date} selected={selected[sprint.id]}
                                                      onClick={() => selectSprint(sprint.id)}/>
                                ))
                                : null
                        }
                    </div>
                </div>
                <br/>
                {
                    sprintPeriod !== null ?
                        <PrimaryButton text="Submit" properties="self-end" onClick={saveDesignSprint}/>
                        : null
                }

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
            </div>

        </>
    )
}

export default DesignSprintApplication;