import React from "react";
import LiftOff from "../icons/LiftOff.svg";
import Caution from "../icons/Caution.svg";
import ThumbsUp from "../icons/ThumbsUp.svg";


function CampaignGuide(){

    return (
        <div className="flex flex-col w-full p-4 lg:p-8 space-y-8">
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Campaign Launch</p>
                <div className="flex flex-row space-x-6">
                    <img src={LiftOff} alt="LiftOff Icon" className="w-16 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Startups who have been validated and <b>approved by our platform</b> will have the opportunity to <b>officially launch their campaign</b>. Every campaign will <b>last for one month</b> and startups will have to <b>successfully raise their campaign</b> during this period.</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">If fundraising campaign fails</p>
                <div className="flex flex-row space-x-6">
                    <img src={Caution} alt="Caution Icon" className="w-16 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify"><b>All funds</b> raised will be <b>returned to investors automatically</b>. In order to start another campaign, you will have to apply for another design sprint.</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">If fundraising campaign succeeds</p>
                <div className="flex flex-row space-x-6">
                    <img src={ThumbsUp} alt="Thumbs Up Icon" className="w-16 md:w-28" />
                    <div className="flex flex-col space-y-3">
                        <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Congratulations! Your investors will be part stakeholders in your company while you have access to the funds. Funds will be <b>transferred</b> to you in the form of <b>XSGD</b> into your <b>company’s Zilpay wallet address</b>.</p>
                        <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">However, a <b>percentage of funds</b> will only be made <b>available</b> to you upon <b>completion of a milestone</b> deliverable. Your <b>assigned commercial champion</b> will now <b>work very closely</b> with you and with his expertise and guidance push you towards achieving your milestones and your success beyond!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampaignGuide;