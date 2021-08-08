import React, { useState } from 'react';
import SearchBar from "../../components/SearchBar/SearchBar";
import RetailInvestorHomePageTabs from "./RetailInvestorHomePageTabs";
import StartupShowcase from "./StartupShowcase";
import Logo from '../../components/Header/Logo.svg'

import jwt_decode from "jwt-decode"

// Redux
import { useSelector } from 'react-redux'
import { getToken } from '../../store/auth'

function RetailInvestorHomePage(){
    const accessToken = useSelector(getToken)
    var decoded = jwt_decode(accessToken)

    const [isActiveTab, setIsActiveTab] = useState({
        first: true,
        second: false,
        third: false,
        fourth: false
    })

    // TODO API Calls for home page

    // TODO SearchBar logic (API/Filter)
    const [searchTerms, setSearchTerms] = useState("")

    // TODO Integration with SearchBar
    // TODO API Integration for different Tabs / Filtering on Front End

    function isRetailInvestorVerified(msg) {
        if (msg.permissions[0] === "retailInvestor:unverified") {
            // console.log("NOT VERIFIED!")
            return false
        }
        // console.log("ITS VERIFIED")
        return true
    }

    return(
        <>
            {
                isRetailInvestorVerified(decoded) ? 
                <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto xl:px-40 lg:px-24 md:px-12 sm:px-8">
                    <SearchBar onChangeFunc={setSearchTerms} />
                    <RetailInvestorHomePageTabs setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} />
                    <StartupShowcase searchTerms={searchTerms} category={isActiveTab} />
                    <br />
                    <br />
                </div> :
                <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto xl:px-40 lg:px-24 md:px-12 sm:px-8">
                    <img src={Logo} alt="Company Logo" className="flex flex-row w-1/3 justify-center" />
                    <p className="font-Rubik text-xl">You not KYC verified yet. Please return in 2-3 days after we have verified your identity.</p>
                </div>
            }
        </>
        
    )
}

export default RetailInvestorHomePage;