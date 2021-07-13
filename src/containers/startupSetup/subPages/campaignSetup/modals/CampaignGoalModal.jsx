import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types";
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton";
import PrimaryInput from "../../../../../components/PrimaryInput/PrimaryInput";
import TargetIcon from "./target.svg"
import SharesIcon from "./shares.svg"
import MoneyIcon from "./money.svg"
import InfoIcon from "./info.svg"
import ReactTooltip from 'react-tooltip';
import ConfigData from '../../../../../config';

// For redux
import { useSelector } from 'react-redux'
import { getStartupId } from '../../../../../store/auth'

function CampaignGoalModal({ ModalFunc, showModal, editCampaignGoal, campaignGoal }){
    const startupId = useSelector(getStartupId)

    const [tempCampaignGoal, setTempCampaignGoal] = useState(campaignGoal)

    function setCampaignGoalProperties(selected) {
        function setSelectedCampaignGoalProperty(e) {
            setTempCampaignGoal(prevState => ({
                ...prevState,
                [selected]: e.target.value
            }))
        }
        return setSelectedCampaignGoalProperty;
    }

    const saveCampaignGoal = async () => {
        editCampaignGoal(tempCampaignGoal)
        ModalFunc()

        // API to update/set campaignDetails goals
        const response = await fetch(ConfigData.SERVER_URL + '/db/startup/campaign/update/' + startupId, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(tempCampaignGoal)
        })

        const status = await response.status
        if (status === 200) {
            const res = await response.json()
            console.log(res)

        } else {
            const error = await response.json()
            console.log("Error", error)
        }
    }

    useEffect(()=>{
        setTempCampaignGoal(campaignGoal)
    },[showModal])

    return(
        <>
            {showModal ? (
                <div className="space-x-0">
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-2"
                    >
                        <div className="w-auto my-auto mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto">
                                {/*header*/}
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-90 w-1/9 float-right text-3xl text-center leading-none font-semibold outline-none focus:outline-none"
                                    onClick={ModalFunc}
                                >
                                    <p className="bg-transparent text-black h-6 w-6 text-2xl focus:outline-none">
                                        ×
                                    </p>
                                </button>
                                <div className="flex items-start justify-between p-5 rounded-t lg:px-20">
                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold lg:font-semibold items-center w-full text-center">
                                        Campaign Goal
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="p-6 flex flex-wrap align-middle justify-center flex-col w-full">
                                    <p className="my-4 lg:text-lg leading-relaxed font-Inter text-gray-500 px-2">
                                        Set up your proposed Crowdfunding Target, Security Token Offerings and allocation of shares to retail investors
                                    </p>
                                    <div className="flex flex-wrap flex-col w-full">
                                        <div className="flex flex-row justify-between items-center px-2">
                                            <div className="flex flex-row w-1/2 sm:w-1/3 justify-evenly">
                                                <p className="bg-secondary text-white font-bold px-2 py-2 rounded-xl text-center text-xs md:text-base">
                                                    COMPANY VALUATION
                                                </p>
                                                <img src={InfoIcon} alt="Hover for more information"
                                                     data-multiline="true"
                                                     data-border={true}
                                                     data-border-color="black"
                                                     data-for="companyValuation"
                                                     data-tip="COMPANY VALUATION = <br />CROWDFUNDING TARGET X<br /> (100%/SHARES ALLOCATION TO<br /> INVESTORS)"/>
                                            </div>
                                            <p className="text-center w-1/2 sm:w-1/3 text-sm md:text-md rounded-xl bg-gray-100 px-2 py-2 xl:text-xl m-4 font-Inter">
                                                ${tempCampaignGoal.goal * (100 / tempCampaignGoal.sharesAllocated)}
                                            </p>
                                        </div>
                                        <br/>
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-col w-1/3 h-48 items-center space-y-4">
                                                <p className="font-Rubik break-words w-full md:w-3/4 text-center text-xs md:text-base ">CROWDFUNDING TARGET</p>
                                                <img src={TargetIcon} alt="Target Icon" className="h-20" />
                                                <div className="flex flex-row justify-center">
                                                    <p className="self-center font-bold font-Rubik text-xs md:text-md">$</p>
                                                    <PrimaryInput properties="text-center w-2/3 text-xs md:text-md"
                                                                  value={tempCampaignGoal.goal}
                                                                  onChange={setCampaignGoalProperties('goal')}
                                                                  type="number" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-1/3 h-48 items-center space-y-4">
                                                <p className="font-Rubik w-full md:w-3/4 text-center text-xs md:text-base">SHARES ALLOCATION TO INVESTORS</p>
                                                <img src={SharesIcon} alt="Target Icon" className="h-20" />
                                                <div className="flex flex-row justify-center">
                                                    <PrimaryInput properties="text-center w-2/3 text-xs md:text-md"
                                                                  value={tempCampaignGoal.sharesAllocated}
                                                                  onChange={setCampaignGoalProperties('sharesAllocated')}
                                                                  type="number" />
                                                    <p className="self-center font-bold font-Rubik text-xs md:text-md">%</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-1/3 h-48 items-center space-y-4">
                                                <div className="flex flex-row w-1/2 sm:w-1/3 justify-evenly">
                                                    <p className="font-Rubik break-words text-center text-xs md:text-base ">TOKENS CONVERTED</p>
                                                    <img src={InfoIcon} alt="Hover for more information"
                                                         data-multiline="true"
                                                         data-border={true}
                                                         data-for="tokensConverted"
                                                         data-border-color="black"
                                                         data-tip="TOKENS ARE CALCULATED<br /> BASED ON CURRENT<br /> CONVERSION RATE" />
                                                </div>
                                                <img src={MoneyIcon} alt="Target Icon" className="h-20" />
                                                <div className="flex flex-row justify-center">
                                                    <PrimaryInput properties="text-center w-2/3 text-xs md:text-md"
                                                                  value={tempCampaignGoal.tokensMinted}
                                                                  onChange={setCampaignGoalProperties('tokensMinted')}
                                                                  type="number" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <br />
                                <PrimaryButton properties="self-end m-4" text="Submit" onClick={saveCampaignGoal} />
                            </div>
                        </div>
                    </div>
                    <ReactTooltip place="right" type="light" effect="float" id="companyValuation"/>
                    <ReactTooltip place="bottom" type="light" effect="float" id="tokensConverted"/>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    )
}

CampaignGoalModal.propTypes = {
    ModalFunc: PropTypes.func,
    showModal: PropTypes.bool,
    editCampaignGoal: PropTypes.func,
    campaignGoal: PropTypes.object
}


export default CampaignGoalModal;
