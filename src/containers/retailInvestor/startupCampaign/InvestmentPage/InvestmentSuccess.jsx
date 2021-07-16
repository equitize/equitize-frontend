import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MeetupMouse from "../../../retailInvestorHomePage/tempImages/MeetupMouse.svg";
import Zilliqa from './Zilliqa.svg'
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import { useHistory, useParams } from "react-router-dom";
import queryString from 'query-string';
import Loading from '../../../../components/Loading/Loading'
import ConfigData from "../../../../config";
import TextModal from "../../../../components/Modal/TextModal";

const InvestmentSuccess = () => {
    let { id } = useParams()
    const [pledgeResult, setPledgeResult] = useState('')
    const [done, setDone] = useState(undefined)
    const [loading, setLoading] = useState(undefined)

    const [showError, setShowError] = useState(false)
    const [resError, setResError] = useState("")
    
    const history = useHistory()

    let params = queryString.parse(history.location.search)
    const { deposit } = params

    useEffect(() => {
        pledgeAmount();
    }, [])

    const pledgeAmount = async () => {

        const response = await fetch(ConfigData.SERVER_URL + '/db/retailInvestors/campaign/pledge/' + id, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ~jwttoken~'
            },
            method: 'PUT',
            body: JSON.stringify({
                "pledgeAmount": deposit
            }) 
        })

        const status = response.status
        if (status === 200) {
            const res = await response.json()

            if (res.message === "Milestone SC and Fungible Token SC succesfully deployed.") {
                setPledgeResult(res)
                setLoading(true)
                setTimeout(() => {
                    setDone(true)
                }, 3000)
            }

        } else {
            const error = await response.json()
            console.log("Error", error)

            setShowError(true)
            setResError("Error " + error.error.status + ": " + error.error.message)
        }
    }

    function closeModal() {
        function changeSelectedModalState() {
            setShowError(false)
        }
        return changeSelectedModalState;
    }

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
            <TextModal header="Error" showModal={showError} setShowModal={closeModal()} 
                                content={resError}
                                />
            <p className="font-Rubik text-center text-2xl sm:text-3xl md:text-4xl w-2/3">Transaction Confirmed for</p>
            <p className="font-Rubik text-center text-2xl sm:text-3xl md:text-4xl w-2/3">{startupObject.name}</p>
            <br />
            <img src={Zilliqa} alt="Zilliqa Icon" className="w-1/3" />
            <br />
            {!done ? (
                <>
                <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2">Congratulations! Campaign has reached its goal.</p>
                <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2">Deploying smart contracts...</p>
                <Loading loading={loading}/>
                <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2">Do not navigate away from this page.</p>
                {/* <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2">When the funding succeeds, you will be given</p>
                <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2 text-secondary">2000 tokens</p>
                <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2"> for your investment amount</p> */}
                </>
            ) : (
                <>
                <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2">Milestone Smart Contract Address: {pledgeResult.milestoneSCaddress}</p>
                <p className="font-Rubik text-center text-sm sm:text-base md:text-lg w-1/2">Fungible Token Address: {pledgeResult.fungibleTokenSCaddress}</p>
                </>
            )}
            
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

InvestmentSuccess.propTypes = {
    location: PropTypes.object
}


export default InvestmentSuccess;