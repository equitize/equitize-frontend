import React, { useState } from "react";
import StartupSetupTabs from "./StartupSetupTabs";
import AccountVerification from "./subPages/accountVerification/AccountVerification";
import CampaignSetup from "./subPages/campaignSetup/CampaignSetup"
import CommercialChampion from "./subPages/commericalChampion/CommercialChampion";
import DesignSprintApplication from "./subPages/designSprintApplication/DesignSprintApplication";

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
            {
                isActiveTab.first ?
                    <AccountVerification />
                    : null
            }
            {
                isActiveTab.second ?
                    <CampaignSetup />
                    : null
            }
            {
                isActiveTab.third ?
                    <CommercialChampion />
                    : null
            }
            {
                isActiveTab.fourth ?
                    <DesignSprintApplication />
                    : null
            }
        </div>
    )
}


export default StartupSetup;