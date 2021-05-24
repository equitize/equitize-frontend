import React from "react";
import StartupSetupTabs from "./StartupSetupTabs";

function StartupSetup(){


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
            <StartupSetupTabs />
            <br/>
        </div>
    )
}


export default StartupSetup;