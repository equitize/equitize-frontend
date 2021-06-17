import React from "react";
import PropTypes from "prop-types";
import TabButton from "../../components/Tabs/TabButton";
import { getKeyByValue } from "../../helpers";

function RetailInvestorHomePageTabs({isActiveTab, setIsActiveTab}) {
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
        <div className="flex flex-row w-full mx-0 sm:space-x-6 md:space-x-20 lg:space-x-40 my-6 justify-evenly">
                <TabButton text="All" active={isActiveTab.first} onClick={() => changeTab("first")}/>
                <TabButton text="Technology" active={isActiveTab.second} onClick={() => changeTab("second")}/>
                <TabButton text="Lifestyle" active={isActiveTab.third} onClick={() => changeTab("third")}/>
                <TabButton text="Education" active={isActiveTab.fourth} onClick={() => changeTab("fourth")}/>
        </div>
    )
}

RetailInvestorHomePageTabs.propTypes = {
    isActiveTab: PropTypes.object,
    setIsActiveTab: PropTypes.func
}

export default RetailInvestorHomePageTabs;