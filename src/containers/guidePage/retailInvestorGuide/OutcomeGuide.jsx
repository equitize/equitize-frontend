import React from "react";
import Caution from '../icons/Caution.svg'
import ThumbsUp from '../icons/ThumbsUp.svg'
import ExistingInvestments from '../icons/ExistingInvestments.svg'

function OutcomeGuide(){

    return (
        <div className="flex flex-col w-full p-4 lg:p-8 space-y-8">
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">If fundraising campaign fails</p>
                <div className="flex flex-row space-x-6">
                    <img src={Caution} alt="Caution Logo" className="w-16 md:w-24" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Your investments are protected in smart contracts that are written to <b>return 100% of your investments safely</b> when the <b>fundraising campaign fails</b>. No questions asked.</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">If fundraising campaign succeeds</p>
                <div className="flex flex-row space-x-6">
                    <img src={ThumbsUp} alt="Thumbs Up Logo" className="w-16 md:w-24" />
                    <div className="flex flex-col space-y-3">
                        <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">You are now proud owners of the startup equity! Your <b>XSGD will be converted into security tokens</b> and <b>transferred to your Zilpay account</b>. You <b>can add the security token</b> to your Zilpay wallet by <b>adding the unique token address</b> reflected on your profile page, which <b>represents the equity you now own.</b></p>
                        <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">In order to <b>enhance your investment security</b>, we implement a <b>milestone system in our smart contracts</b> where funds will be <b>unlocked only upon completion of the milestones</b> that they have set for themselves, which is vetted and <b>approved by us</b>. If startups <b>default prematurely</b> before completing all their milestones, we will <b>return the remaining funds back</b> to you, offering a <b>higher level of protection</b> over your investments.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">View your investment progress</p>
                <div className="flex flex-row space-x-6">
                    <img src={ExistingInvestments} alt="View Investments Logo" className="w-16 md:w-24" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">After investing, you can view all the startup investments on your profile and <b>track their progress</b> for any <b>updates</b>. You can track what startups have <b>successfully funded</b> and startups with <b>ongoing campaigns</b>.</p>
                </div>
            </div>
        </div>
    )
}

export default OutcomeGuide;