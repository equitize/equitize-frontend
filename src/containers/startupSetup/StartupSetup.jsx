import React, { useState } from "react";
import StartupSetupTabs from "./StartupSetupTabs";
import PrimaryTextArea from "../../components/PrimaryTextArea/PrimaryTextArea";
import PrimaryUploadButton from "../../components/PrimaryUploadButton/PrimaryUploadButton";

function StartupSetup(){
    const [isActiveTab, setIsActiveTab] = useState({
        first: true,
        second: false,
        third: false,
        fourth: false
    })

    return (
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <div className="text-4xl md:text-6xl font-Rubik">
                <p>Startup Profile</p>
            </div>
            <br/>
            <br/>
            <div className="text-md md:text-xl font-Rubik text-gray-500 ">
                <p>Setup your profile and campaign details</p>
            </div>
            <br/>
            <StartupSetupTabs setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab}/>
            <br/>
            <div className="bg-white px-24 py-16 rounded-xl space-y-10 shadow-lg h-full w-full flex flex-col items-center">
                <PrimaryUploadButton text="Upload CAP Table" />
                <PrimaryTextArea placeholder="Short Description of your Business" properties="w-full"/>

            </div>
        </div>
    )
}


export default StartupSetup;