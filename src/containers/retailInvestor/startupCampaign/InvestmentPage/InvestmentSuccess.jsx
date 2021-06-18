import React from "react";
import MeetupMouse from "../../../retailInvestorHomePage/tempImages/MeetupMouse.svg";
import Zilliqa from './Zilliqa.svg'
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import { useHistory } from "react-router-dom";

function InvestmentSuccess(){
    const history = useHistory()

    // TODO CALL API FOR DATA (ONLY Startup Name)
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

    // TODO Related API DATA with regards to expected tokens to receive

    // TODO View Existing Investments Page for investors
    function returnToHomePage(){
        history.push('/home')
    }

    return (
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <p className="font-Rubik text-center text-2xl sm:text-3xl md:text-4xl w-2/3">Transaction Confirmed for</p>
            <p className="font-Rubik text-center text-2xl sm:text-3xl md:text-4xl w-2/3">{startupObject.name}</p>
            <br />
            <img src={Zilliqa} alt="Zilliqa Icon" className="w-1/3" />
            <br />
            <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2">When the funding succeeds, you will be given</p>
            <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2 text-secondary">2000 tokens</p>
            <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2"> for your investment amount</p>
            <br />
            <div className="flex flex-row justify-between w-full sm:w-2/3 md:w-1/2">
                <PrimaryButton text="View Investment" onClick={returnToHomePage} />
                <PrimaryButton text="Return Home" onClick={returnToHomePage} />
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}



export default InvestmentSuccess;