import React from "react";
import PropTypes from "prop-types";
import { getKeyByValue } from "../../../helpers";
import TabButtonWithBackground from "./TabButtonWithBackground";
import LogOutModal from "./LogOutModal";

function ProfilePageTabs({ isActiveTab, setIsActiveTab, profilePicture }){
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

    return(
        <>
            <br />
            <div className="flex justify-center">
                <img src={profilePicture} alt="Profile Picture"
                     className="w-20 sm:w-24 lg:w-48" />
            </div>
            <br />
            <br />
            <div className="flex flex-col items-center justify-items-center">
                <TabButtonWithBackground text="Overview" active={isActiveTab.first} onClick={() => changeTab("first")}/>
                <TabButtonWithBackground text="Updates" active={isActiveTab.second} onClick={() => changeTab("second")}/>
                <TabButtonWithBackground text="Account Settings" active={isActiveTab.third} onClick={() => changeTab("third")}/>
            </div>
            <br />
            <br />
            <div className="flex flex-col items-center justify-items-center">
                <LogOutModal />
            </div>
            <br />
        </>
    )

}

ProfilePageTabs.propTypes = {
    isActiveTab: PropTypes.object,
    setIsActiveTab: PropTypes.func,
    profilePicture: PropTypes.string
}

export default ProfilePageTabs;