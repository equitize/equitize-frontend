import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import { formattedSum } from "../../../../helpers";
import { Range } from "react-range";
import ZilpayModal from "./ZilpayModal";
// React query
import { useQuery } from 'react-query'

// React query fetch functions
const getStartupDetails = async (key) => {
    const res = await fetch('http://localhost:8080/api/db/startup/' + key.queryKey[1])
    return res.json()
}

function StartupCampaignInvestment(){
    let { id } = useParams()
    const history = useHistory()
    const [investmentAmount, setInvestmentAmount] = useState([0])

    const { data, status } = useQuery(['viewStartupDetails', id], getStartupDetails)
    console.log(status, data)

    // TODO CALL API FOR DATA
    // const startupObject = {
    //     name: "Meetup Mouse",
    //     description: "Meetup Mouse suggests the BEST hand-picked places for your group’s needs so you and your friends NEVER worry about where to eat again!",
    //     fundedAmount: 200000,
    //     sharesAllocated: "20",
    //     campaignGoal: 500000,
    //     endTime: "47",
    //     id: 1,
    //     imageLink: MeetupMouse
    // }

    function returnToCampaignPage(){
        history.push(`/startup/${id}`)
    }

    // TODO Loading Page? Unique URL? Actual ZILPAY integration?
    const getInvestmentData = () => {
        const investmentData = {...data, "pledgeAmount": investmentAmount[0]}
        // const investmentData = { "pledgeAmount": investmentAmount[0] }

        return investmentData
        //history.push(
        //    `/startup/${id}/invest/transactionSuccess?deposit=${investmentAmount[0]}`
        //)

        // //TODO: Hardcoded baseURL
        // const response = await fetch('http://localhost:8080/api/db/retailInvestors/campaign/pledge/' + id, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'Authorization': 'Bearer ~jwttoken~'
        //     },
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         "pledgeAmount": investmentAmount[0]
        //     }) 
        // })
        // const res = await response.json()
        // console.log(res)
        // if (res.message === "Campaign was updated successfully.") {
        //     history.push(`/startup/${id}/invest/transactionSuccess`)
        // }
    }

    return (
        <>
        { status === 'loading' && (
                <div>Loading...</div>
            )}

        { status === 'error' && (
                <div>Error fetching data</div>
            )}

        { status === 'success' && (
                <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto space-y-2">
                <br />
                <div className="w-full flex flex-row justify-between">
                    <div className="w-1/3">
                        <PrimaryButton text="Back" properties="lg:px-10 self-start" onClick={returnToCampaignPage}/>
                    </div>
                    <p className="w-1/3 text-center font-Rubik font-bold text-xl md:text-2xl lg:text-4xl">{data.companyName}</p>
                    <div className="w-1/3"></div>
                </div>
                <div className="flex justify-center">
                    <p className="font-Inter text-gray-500 text-center w-2/3 text-sm md:text-base">{data.profileDescription}</p>
                </div>
                <br />
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/3">
                        <p className="font-Inter text-green-500 font-bold text-xs md:text-xl lg:text-2xl self-center">S${formattedSum(data.campaigns[0].currentlyRaised)}</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 text-center">of ${formattedSum(data.campaigns[0].goal)} raised</p>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <p className="font-Inter text-sm md:text-xl lg:text-2xl text-center">{data.campaigns[0].sharesAllocated}%</p>
                        <p className="font-Inter text-xs md:text-base lg:text-sm lg:text-base text-gray-500 text-center">Equity Stake to Investors</p>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <p className="font-Inter text-sm md:text-xl lg:text-2xl text-center">{data.campaigns[0].endDate ? data.campaigns[0].endDate : 9 }</p>
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
                        <p className="text-secondary font-Rubik text-base text-lg md:text-2xl lg:text-3xl text-center">{Math.round(investmentAmount[0]/data.campaigns[0].goal * 100 * 100) / 100}%</p>
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
                <ZilpayModal getInvestmentData={getInvestmentData()} />
                <br />
            </div>
            )}
        </>
    )
}

export default StartupCampaignInvestment;