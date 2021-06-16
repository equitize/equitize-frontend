import React from "react";
import PropTypes from "prop-types";
import TabButton from "../../../components/Tabs/TabButton";
import { getKeyByValue } from "../../../helpers";

function CampaignTabs({ isActiveTab, setIsActiveTab }) {
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
        <div className="flex flex-row w-full mx-0 sm:space-x-0 md:space-x-10 my-6 justify-evenly">
            <TabButton text="Campaign" active={isActiveTab.first} onClick={() => changeTab("first")}/>
            <TabButton text="Milestones" active={isActiveTab.second} onClick={() => changeTab("second")}/>
            <TabButton text="FAQs" active={isActiveTab.third} onClick={() => changeTab("third")}/>
            <TabButton text="Research" active={isActiveTab.fourth} onClick={() => changeTab("fourth")}/>
        </div>
    )
}

CampaignTabs.propTypes = {
    isActiveTab: PropTypes.object,
    setIsActiveTab: PropTypes.func
}

export default CampaignTabs;