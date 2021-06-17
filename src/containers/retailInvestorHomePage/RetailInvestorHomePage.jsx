import React, { useState } from 'react';
import SearchBar from "../../components/SearchBar/SearchBar";
import RetailInvestorHomePageTabs from "./RetailInvestorHomePageTabs";
import StartupShowcase from "./StartupShowcase";

function RetailInvestorHomePage(){
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

    return(
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <SearchBar onChangeFunc={setSearchTerms} />
            <RetailInvestorHomePageTabs setIsActiveTab={setIsActiveTab} isActiveTab={isActiveTab} />
            <StartupShowcase searchTerms={searchTerms} category={isActiveTab} />
            <br />
            <br />
        </div>
    )
}

export default RetailInvestorHomePage;