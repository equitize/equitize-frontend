import React, {useState} from "react";
import UserTabs from "./UserTabs";
import RetailInvestorGuide from "./retailInvestorGuide/RetailInvestorGuide";
import StartupGuide from "./StartUpGuide/StartupGuide";

function GuidePage(){
    const [isActiveUserTab, setIsActiveUserTab] = useState({
        first: true,
        second: false
    })

    return (
        <div className="container px-5 py-10 md:py-20 mx-auto flex flex-col items-center space-y-5">
            <p className="font-Rubik text-xl sm:text-3xl md:text-4xl lg:text-5xl">How it works</p>
            <UserTabs setIsActiveUserTab={setIsActiveUserTab} isActiveUserTab={isActiveUserTab} />
            {
                isActiveUserTab.first ?
                    <RetailInvestorGuide />
                    : isActiveUserTab.second ?
                    <StartupGuide />
                    : null
            }
        </div>
    )
}

export default GuidePage;