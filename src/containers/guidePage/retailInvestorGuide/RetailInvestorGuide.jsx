import React, {useState} from "react";
import SetupGuide from "./SetupGuide";
import InvestmentGuide from "./InvestmentGuide";
import OutcomeGuide from "./OutcomeGuide";
import RetailInvestorTabs from "./RetailInvestorTabs";


function RetailInvestorGuide(){
    const [isActiveStepTab, setIsActiveStepTab] = useState({
        first: true,
        second: false,
        third: false
    })

    return(
        <>
            <br />
            <RetailInvestorTabs isActiveStepTab={isActiveStepTab} setIsActiveStepTab={setIsActiveStepTab} />
            {
                isActiveStepTab.first ?
                    <SetupGuide />
                    : isActiveStepTab.second ?
                        <InvestmentGuide />
                        : isActiveStepTab.third ?
                        <OutcomeGuide />
                        : null
            }
        </>
    )
}

export default RetailInvestorGuide;