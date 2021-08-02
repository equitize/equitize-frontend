import React from "react";
import SelectStartups from '../icons/SelectStartups.svg'
import Dollar from '../icons/Dollar.svg'

function InvestmentGuide(){

    return (
        <div className="flex flex-col w-full p-4 lg:p-8 space-y-8">
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Select from a highly vetted range of startups</p>
                <div className="flex flex-row space-x-6">
                    <img src={SelectStartups} alt="Select Startups Logo" className="w-20 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Our platform has a stringent selection criteria in onboarding startups where we put through startup through a <b>week long design sprint</b> and assess their current strength and potential and only <b>allow the best</b> to work alongside our commercial champions who are industry experts that will <b>mentor our startups to ensure their success</b>, as well as yours as well!</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Investing in your startup</p>
                <div className="flex flex-row space-x-6">
                    <img src={Dollar} alt="Investment Logo" className="w-20 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Once you decide on what company, you may select how much you want to invest in. In order to <b>protect you from taking excessive amount of risk</b>, we have capped an investment <b>limit to 10,000 XGD per retail investor</b>, so invest wisely and do your due dilligence! Once you decided on the startup to invest in, your <b>XSGD will be deposited safely</b> in our <b>smart contract technology</b> that <b>cannot be tampered with</b>, not even by us.</p>
                </div>
            </div>
        </div>
    )
}

export default InvestmentGuide;