import React, {useState} from "react";
import StartupTabs from "./StartupTabs";
import SetupGuide from "./SetupGuide";
import CommercialChampionGuide from "./CommercialChampionGuide";
import CampaignGuide from "./CampaignGuide";


function StartupGuide(){
    const [isActiveStepTab, setIsActiveStepTab] = useState({
        first: true,
        second: false,
        third: false
    })

    return(
        <>
            <br />
            <StartupTabs isActiveStepTab={isActiveStepTab} setIsActiveStepTab={setIsActiveStepTab} />
            {
                isActiveStepTab.first ?
                    <SetupGuide />
                    : isActiveStepTab.second ?
                        <CommercialChampionGuide />
                        : isActiveStepTab.third ?
                            <CampaignGuide />
                            : null
            }
        </>
    )
}

export default StartupGuide;