import React, {useEffect, useState} from "react";
import ProfilePageTabs from "./ProfilePageTabs";
import Overview from "./subPages/Overview";
import Updates from "./subPages/Updates";
import AccountSettings from "./subPages/AccountSettings";
import DefaultPic2 from './defaultPic2.svg'
import ConfigData from "../../../config";

import { useQuery, useQueryClient } from 'react-query'

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
    const queryClient = useQueryClient()

    // TBC
    const [onAccountSettingsTab, setOnAccountSettingsTab] = useState(false)
    useEffect(() => {
        setOnAccountSettingsTab(!onAccountSettingsTab)
    },[isActiveTab.third])

    // React query fetch requests
    const { data, status } = useQuery(['retailInvestorDetails', retailInvestorID, accessToken], fetchRIByID, {
        enabled: true
    })
    // console.log(data)

    const updateAccountFunc = async (newAccountDetails) => {
        // console.log("NEW ACCOUNT DETAILS BELOW")
        // console.log(newAccountDetails)

        const response = await fetch(ConfigData.SERVER_URL + '/db/retailInvestors/' + retailInvestorID, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            method: 'PUT',
            body: JSON.stringify(newAccountDetails)
        })

        const res = await response.json()
        console.log(res)

        await queryClient.invalidateQueries('retailInvestorDetails')
    }

    const updateInterestsFunc = async (newPreferences) => {
        console.log("Updating retail investor industry preferences")
        console.log(newPreferences)
        // const response = await fetch(ConfigData.SERVER_URL + '/db/retailInvestors/industries/addIndustries/' + retailInvestorID, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + accessToken
        //     },
        //     method: 'POST',
        //     body: JSON.stringify(newAccountDetails)
        // })

        // const res = await response.json()
        // console.log(res)

        // await queryClient.invalidateQueries('retailInvestorDetails')
    }

    return(
        <>
            {
                status === 'loading' && (
                    <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto xl:px-40 lg:px-24 md:px-12 sm:px-8">
                        <p className="font-Rubik text-xl">Loading profile...</p>
                    </div>
                )
            }

            {
                status === 'error' && (
                    <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto xl:px-40 lg:px-24 md:px-12 sm:px-8">
                        <p className="font-Rubik text-xl">An error occurred. Please check back again later.</p>
                    </div>
                )
            }

            {
                status === 'success' && (
                    <div className="container mx-auto flex md:px-2 flex-row items-center space-x-4 w-full border-black border-t-2">
                        <div className="flex flex-col items-center w-1/4 self-start">
                            <ProfilePageTabs setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} profilePicture={DefaultPic2} />
                        </div>
                        <div className="flex flex-col self-start w-full border-black border-l-2 p-3 self-stretch justify-between">
                            {
                                isActiveTab.first ?
                                    <Overview investedCampaigns={data.campaigns} />
                                    : null
                            }
                            {
                                isActiveTab.second ?
                                    <Updates />
                                    : null
                            }
                            {
                                isActiveTab.third ?
                                    <AccountSettings profilePicture={DefaultPic2} profileInfo={data} updateAccountFunc={updateAccountFunc} updateInterestsFunc={updateInterestsFunc} />
                                    : null
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProfilePage;