import React from "react";
import PropTypes from "prop-types";
import TabButton from "./TabButton";
import { getKeyByValue } from "../../helpers";

function StartupSetupTabs({isActiveTab, setIsActiveTab}) {
    function changeTab(tab){
        const activeTab = getKeyByValue(isActiveTab, true)

        if (tab !== activeTab){
            setIsActiveTab(prevState => ({
                ...prevState,
                [tab]: !prevState[tab],
                [activeTab]: !prevState[activeTab]
            }))
        }
    }

    return (
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <div className="flex flex-wrap flex-row text-center justify-between w-full">
                <TabButton text="Account Verification" active={isActiveTab.first} onClick={() => changeTab("first")}/>
                <TabButton text="Campaign Setup" active={isActiveTab.second} onClick={() => changeTab("second")}/>
                <TabButton text="Search for Commercial Champion" active={isActiveTab.third} onClick={() => changeTab("third")}/>
                <TabButton text="Apply for Design Sprints" active={isActiveTab.fourth} onClick={() => changeTab("fourth")}/>
            </div>
        </div>
    )
}

StartupSetupTabs.propTypes = {
    isActiveTab: PropTypes.object,
    setIsActiveTab: PropTypes.func
}

export default StartupSetupTabs;