import React from "react";
import {getKeyByValue} from "../../../helpers";
import UserTabButton from "../UserTabButton";
import NumberOne from "../icons/NumberOne.svg";
import NumberTwo from "../icons/NumberTwo.svg";
import NumberThree from "../icons/NumberThree.svg";
import PropTypes from "prop-types";

function RetailInvestorTabs({ isActiveStepTab, setIsActiveStepTab }){
    function changeTab(tab){
        const activeTab = getKeyByValue(isActiveStepTab, true)

        if (tab !== activeTab){
            setIsActiveStepTab(prevState => ({
                ...prevState,
                [tab]: !prevState[tab],
                [activeTab]: !prevState[activeTab]
            }))
        }
    }

    return (
        <div className="flex flex-row w-full space-x-4 md:space-x-10 justify-center">
            <UserTabButton active={isActiveStepTab.first} icon={NumberOne} onClickFunc={() => changeTab("first")} text="Account & ZilPay Setup"/>
            <UserTabButton active={isActiveStepTab.second} icon={NumberTwo} onClickFunc={() => changeTab("second")} text="Investing in a campaign"/>
            <UserTabButton active={isActiveStepTab.third} icon={NumberThree} onClickFunc={() => changeTab("third")} text="Campaign Outcomes"/>
        </div>
    )
}

RetailInvestorTabs.propTypes = {
    isActiveStepTab: PropTypes.object,
    setIsActiveStepTab: PropTypes.func
}

export default RetailInvestorTabs;