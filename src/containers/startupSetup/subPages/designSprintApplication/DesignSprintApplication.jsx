import React, {useEffect, useState} from "react";
import SprintImage from './sprint.svg'
import DesignSprintItem from "./DesignSprintItem";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import { getKeyByValue } from "../../../../helpers";
import { useHistory } from "react-router-dom";

function DesignSprintApplication(){
    const [selected, setSelected] = useState(null)
    const [sprintPeriod, setSprintPeriod] = useState(null)
    const history = useHistory()

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
            </div>

        </>
    )
}

export default DesignSprintApplication;