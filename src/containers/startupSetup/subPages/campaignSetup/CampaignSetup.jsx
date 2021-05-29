import React, { useState } from "react";
import DropZone from "./DropZone";
import PrimaryTextArea from "../../../../components/PrimaryTextArea/PrimaryTextArea";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";

function CampaignSetup(){
    const [campaignDescription, setCampaignDescription] = useState("")

    function saveCampaignDescription(){
        console.log(campaignDescription)
    }

    return (
        <>
            <div className="bg-white px-6 sm:px-24 py-16 rounded-xl space-y-4 shadow-lg h-full w-full flex flex-wrap flex-col items-center">
                <DropZone placeHolderText="Drop Video Material (MP4, MOV)" acceptedFileTypes="video/*" />
                <DropZone placeHolderText="Drop Pitch Deck Materials (pdf, jpg)" acceptedFileTypes=".jpg, .pdf" />
                <PrimaryTextArea placeholder="Campaign Description" onChangeFunc={setCampaignDescription} properties="w-full h-40"/>
                <button className="bg-custom-blue hover:bg-blue-700 font-bold py-3 px-2 self-stretch text-xs text-white sm:text-sm lg:text-xl lg:px-5 rounded-xl w-full sm:mx-4">
                    <p>SET UP PROPOSED CAMPAIGN MILESTONES</p>
                </button>
                <button className="bg-custom-blue hover:bg-blue-700 font-bold py-3 px-2 self-stretch text-xs text-white sm:text-sm lg:text-xl lg:px-5 rounded-xl w-full sm:mx-4">
                    <p>SET UP ZOOM SESSION FOR CAMPAIGN LAUNCH</p>
                </button>
                <br />
                <br />
                <br />
                <PrimaryButton text="Submit" properties="self-end" onClick={saveCampaignDescription}/>
            </div>
        </>
    )
}

export default CampaignSetup;