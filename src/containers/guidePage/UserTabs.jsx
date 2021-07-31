import React from "react";
import PropTypes from "prop-types";
import {getKeyByValue} from "../../helpers";
import Users from './icons/Users.svg'
import UserTabButton from "./UserTabButton";
import Work from './icons/Work.svg'

function UserTabs({ isActiveUserTab, setIsActiveUserTab }){
    function changeTab(tab){
        const activeTab = getKeyByValue(isActiveUserTab, true)

        if (tab !== activeTab){
            setIsActiveUserTab(prevState => ({
                ...prevState,
                [tab]: !prevState[tab],
                [activeTab]: !prevState[activeTab]
            }))
        }
    }

    return (
        <div className="flex flex-row w-full space-x-10 justify-center">
            <UserTabButton active={isActiveUserTab.first} icon={Users} onClickFunc={() => changeTab("first")} text="Retail Investor"/>
            <UserTabButton active={isActiveUserTab.second} icon={Work} onClickFunc={() => changeTab("second")} text="Startup"/>
        </div>
    )
}

UserTabs.propTypes = {
    isActiveUserTab: PropTypes.object,
    setIsActiveUserTab: PropTypes.func
}

export default UserTabs;