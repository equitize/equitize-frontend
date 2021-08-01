import React, {useEffect, useState} from "react";
import ProfilePageTabs from "./ProfilePageTabs";
import Overview from "./subPages/Overview";
import Updates from "./subPages/Updates";
import AccountSettings from "./subPages/AccountSettings";
import DefaultPic from './defaultPic.svg'
import ConfigData from "../../../config";

import { useQuery } from 'react-query'

// Redux
import { useSelector } from 'react-redux'
import { getID, getToken } from '../../../store/auth'

// React Query functions
const fetchRIByID = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/retailInvestors/' + key.queryKey[1], {
        headers: {
            'Authorization': 'Bearer ' + key.queryKey[2]
        }
    })
    return await res.json()
}

// const profileInfo = {
//     firstName: "Nicole",
//     lastName: "Daniels",
//     address: "221 Baker Street #05-21 543301",
//     interests: [{ name: "Agriculture", id: 1 }, { name: "Education", id: 2}]
// }

function ProfilePage(){
    const [isActiveTab, setIsActiveTab] = useState({
        first: true,
        second: false,
        third: false
    })

    // Redux useSelector
    const retailInvestorID = useSelector(getID)
    const accessToken = useSelector(getToken)

    // TBC
    const [onAccountSettingsTab, setOnAccountSettingsTab] = useState(false)
    useEffect(() => {
        setOnAccountSettingsTab(!onAccountSettingsTab)
    },[isActiveTab.third])

    // React query fetch requests
    const { data } = useQuery(['retailInvestorDetails', retailInvestorID, accessToken], fetchRIByID, {
        enabled: true
    })

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
                            <AccountSettings profilePicture={DefaultPic} profileInfo={data} />
                            : null
                    }
                </div>
            </div>
        </>
    )
}

export default ProfilePage;