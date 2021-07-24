import React, {useEffect, useState} from "react";
import ProfilePageTabs from "./ProfilePageTabs";
import Overview from "./subPages/Overview";
import Updates from "./subPages/Updates";
import AccountSettings from "./subPages/AccountSettings";
import DefaultPic from './defaultPic.svg'

const profileInfo = {
    firstName: "Nicole",
    lastName: "Daniels",
    address: "221 Baker Street #05-21 543301",
    interests: [{ name: "Agriculture", id: 1 }, { name: "Education", id: 2}]
}

function ProfilePage(){
    const [isActiveTab, setIsActiveTab] = useState({
        first: true,
        second: false,
        third: false
    })

    // TBC
    const [onAccountSettingsTab, setOnAccountSettingsTab] = useState(false)
    useEffect(() => {
        setOnAccountSettingsTab(!onAccountSettingsTab)
    },[isActiveTab.third])

    // TODO Call API to get profile info

    return(
        <>
            <div className="container mx-auto flex md:px-2 flex-row items-center space-x-4 w-full border-black border-t-2">
                <div className="flex flex-col items-center w-1/4 self-start">
                    <ProfilePageTabs setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} profilePicture={DefaultPic} />
                </div>
                <div className="flex flex-col self-start w-full border-black border-l-2 p-3 self-stretch justify-between">
                    {
                        isActiveTab.first ?
                            <Overview />
                            : null
                    }
                    {
                        isActiveTab.second ?
                            <Updates />
                            : null
                    }
                    {
                        isActiveTab.third ?
                            <AccountSettings profilePicture={DefaultPic} profileInfo={profileInfo} />
                            : null
                    }
                </div>
            </div>
        </>
    )
}

export default ProfilePage;