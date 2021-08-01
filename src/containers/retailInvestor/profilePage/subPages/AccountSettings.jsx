import React, { useState } from "react";
import PropTypes from "prop-types";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import { RiCloseCircleLine } from "react-icons/ri";
import AddInterestsModal from "./AccountSettings/AddInterestsModal";
// Assuming that this is not taken from API
import allCategories from "../../../retailInvestorRegistration/allCategories";
import { haveSameData } from "../../../../helpers";
import DiscardChangesModal from "./AccountSettings/DiscardChangesModal";

function AccountSettings({ profilePicture, profileInfo, updateAccountFunc, updateInterestsFunc }){

    const [accountDetails, setAccountDetails] = useState({
        firstName: profileInfo.firstName || "",
        lastName: profileInfo.lastName || "",
        address: profileInfo.address || "",
        interests: profileInfo.industryPreferences || []
    })

    const categoryList = allCategories.map((categoryItem)=>{
        const present = accountDetails.interests.filter((interestItem) => haveSameData(categoryItem, interestItem))

        if (present.length === 1){
            return {
                ...categoryItem,
                ...{ checked:true }
            }
        }
        else {
            return {
                ...categoryItem,
                ...{ checked:false }
            }
        }
    })

    function discardChanges(){
        setAccountDetails({
            firstName: profileInfo.firstName || "",
            lastName: profileInfo.lastName || "",
            address: profileInfo.address || "",
            interests: profileInfo.interests || []
        })
    }

    function onInputChange(key){
        function onChange(e){
            setAccountDetails(prevState => ({
                ...prevState,
                [key]: e.target.value
            }))
            // console.log(accountDetails)
        }
        return onChange;
    }

    function saveIndustryPreferencesApiCall(newPreferencesList) {
        // console.log("Saving Changes to industry preferences~")
        // console.log(newPreferencesList)

        updateInterestsFunc(newPreferencesList)
    }

    function saveAccountDetailsApiCall() {
        // console.log("Saving Changes for account details")
        const accountChanges = {
            "firstName": accountDetails.firstName,
            "lastName": accountDetails.lastName
        }

        updateAccountFunc(accountChanges)
    }

    function removeInterestedIndustry(id) {
        function remove(selected) {
            const removedArr = [...accountDetails.interests].filter(industry => industry.id !== selected)
            setAccountDetails(prevState => ({
                ...prevState,
                interests: removedArr
            }))
        }

        return remove(id)
    }

    return(
        <>
            <div className="flex flex-row justify-between space-x-4 self-stretch w-full">
                <p className="text-xl sm:text-2xl md:text-5xl font-bold">Account Settings</p>
            </div>
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-full md:w-2/3">
                    <div className="flex flex-row align-middle items-center w-5/6 space-x-4 w-full xl:w-2/3">
                        <p className="font-bold font-Inter text-xs sm:text-sm lg:text-xl w-1/2">First Name</p>
                        <input className="rounded-xl border-2 border-gray-400 rounded-full placeholder-gray-400 px-2 py-2 text-xs sm:text-base lg:text-lg xl:text-xl m-4 font-Inter"
                               value={accountDetails.firstName} onChange={onInputChange("firstName")} type="text" />
                    </div>
                    <div className="flex flex-row align-middle items-center w-5/6 space-x-4 w-full xl:w-2/3">
                        <p className="font-bold font-Inter text-xs sm:text-sm lg:text-xl w-1/2">Last Name</p>
                        <input className="rounded-xl border-2 border-gray-400 rounded-full placeholder-gray-400 px-2 py-2 text-xs sm:text-base lg:text-lg xl:text-xl m-4 font-Inter"
                               value={accountDetails.lastName} onChange={onInputChange("lastName")} type="text" />
                    </div>
                    <div className="flex flex-row align-middle items-center w-5/6 space-x-4 w-full xl:w-2/3">
                        <p className="font-bold font-Inter text-xs sm:text-sm lg:text-xl w-1/2">Address</p>
                        <input className="rounded-xl border-2 border-gray-400 rounded-full placeholder-gray-400 px-2 py-2 text-xs sm:text-base lg:text-lg xl:text-xl m-4 font-Inter"
                               value={accountDetails.address} onChange={onInputChange("address")} type="text" />
                    </div>
                    <br />
                    <p className="font-bold font-Inter text-xl text-left">Interests</p>
                    <div className="flex flex-row flex-wrap w-full space-x-2 items-center pt-1">
                        {
                            accountDetails.interests.map((industry) => (
                                <div key={industry.id} className="inline-flex w-auto justify-between ml-1 bg-black px-2 rounded-full items-center text-sm my-1">
                                    <div className="text-white font-Inter p-2">
                                        {industry.name}
                                    </div>
                                    <div className='icons'>
                                        <RiCloseCircleLine
                                            onClick={() => removeInterestedIndustry(industry.id)}
                                            className='fill-current text-white cursor-pointer text-base ml-2'
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <AddInterestsModal categoryList={categoryList} saveChanges={saveIndustryPreferencesApiCall} />
                </div>
                <div className="flex flex col md:w-1/3 self-start justify-center">
                    <img src={profilePicture} alt="Profile Picture" className="w-full md:w-48" />
                </div>
            </div>
            <br />
            <br />
            <div className="flex flex-row justify-between pb-3">
                <DiscardChangesModal discardChanges={discardChanges} />
                <PrimaryButton text="Apply Changes" onClick={saveAccountDetailsApiCall} />
            </div>
        </>
    )
}

AccountSettings.propTypes = {
    profilePicture: PropTypes.string,
    profileInfo: PropTypes.object,
    updateAccountFunc: PropTypes.func,
    updateInterestsFunc: PropTypes.func
}

export default AccountSettings;