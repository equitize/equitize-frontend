import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import MeetupMouse from "../../../retailInvestorHomePage/tempImages/MeetupMouse.svg";
import { formattedSum } from "../../../../helpers";
import { Range } from "react-range";


function StartupCampaignInvestment(){
    let { id } = useParams()
    const history = useHistory()
    const [investmentAmount, setInvestmentAmount] = useState([0])

    // TODO CALL API FOR DATA
    const startupObject = {
        name: "Meetup Mouse",
        description: "Meetup Mouse suggests the BEST hand-picked places for your group’s needs so you and your friends NEVER worry about where to eat again!",
        fundedAmount: 200000,
        sharesAllocated: "20",
        campaignGoal: 500000,
        endTime: "47",
        id: 1,
        imageLink: MeetupMouse
    }

    function returnToCampaignPage(){
        history.push(`/startup/${id}`)
    }

    // TODO Loading Page? Unique URL? Actual ZILPAY integration?
    function submitInvestment(){
        history.push(`/startup/${id}/invest/transactionSuccess`)
    }

    return (
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto space-y-2">
            <br />
            <div className="w-full flex flex-row justify-between">
                <div className="w-1/3">
                    <PrimaryButton text="Back" properties="lg:px-10 self-start" onClick={returnToCampaignPage}/>
                </div>
                <p className="w-1/3 text-center font-Rubik font-bold text-xl md:text-2xl lg:text-4xl">{startupObject.name}</p>
                <div className="w-1/3"></div>
            </div>
            <div className="flex justify-center">
                <p className="font-Inter text-gray-500 text-center w-2/3 text-sm md:text-base">{startupObject.description}</p>
            </div>
            <br />
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/3">
                    <p className="font-Inter text-green-500 font-bold text-xs md:text-xl lg:text-2xl self-center">S${formattedSum(startupObject.fundedAmount)}</p>
                    <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 text-center">of ${formattedSum(startupObject.campaignGoal)} raised</p>
                </div>
                <div className="flex flex-col w-1/3">
                    <p className="font-Inter text-sm md:text-xl lg:text-2xl text-center">{startupObject.sharesAllocated}%</p>
                    <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 text-center">Equity Stake to Investors</p>
                </div>
                <div className="flex flex-col w-1/3">
                    <p className="font-Inter text-sm md:text-xl lg:text-2xl text-center">{startupObject.endTime}</p>
                    <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 text-center">Hours Left</p>
                </div>
            </div>
            <br />
            <div className="flex flex-row justify-between w-full mx-auto">
                <div className="flex flex-col w-5/6 space-y-3">
                    <p className="font-Inter font-bold text-base md:text-lg">Your Investment Amount</p>
                    <div className="w-full">
                        <Range
                            step={1}
                            min={0}
                            max={10000}
                            values={investmentAmount}
                            onChange={setInvestmentAmount}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    className="w-full h-3 my-4 bg-gray-200 rounded-md"
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    className="w-5 h-5 transform translate-x-10 bg-secondary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <div className="absolute font-Inter text-sm font-bold top-7 p-0.5 -left-3.5 w-10">
                                        <p className="text-secondary text-center font-Inter text-xs sm:text-sm md:text-base">${formattedSum(investmentAmount[0])}</p>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <p className="font-Inter font-bold text-sm md:text-base lg:text-lg text-center">Equity Received</p>
                    <p className="text-secondary font-Rubik text-base text-lg md:text-2xl lg:text-3xl text-center">{Math.round(investmentAmount[0]/startupObject.campaignGoal * 100 * 100) / 100}%</p>
                </div>
            </div>
            <br />
            <br />
            <p className="font-Inter font-bold text-lg text-left self-start">Risk disclosure</p>
            <p className="font-Inter w-11/12 text-left self-start text-sm md:text-base">
                These Risk Disclosures are meant to provide general information about the risks involved in investing or otherwise participating in any campaign made available on the Website or through the Services (each, a“Participation”). They are not, and should not be construed as, any form of legal, financial, tax, or other professional advice that is particular to any person, including yourself. You are responsible for seeking professional advice before participating in any such campaign, and for carefully considering whether such participation is suitable in light of your particular circumstances, including your particular level of experience and sophistication; investment objectives; risk appetite; investment horizon; and financial needs and resources.
            </p>
            <br />
            <br />
            <PrimaryButton text="Submit" properties="self-end" onClick={submitInvestment} />
            <br />
        </div>
    )

}




export default StartupCampaignInvestment;