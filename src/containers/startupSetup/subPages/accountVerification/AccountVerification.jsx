import React, { useState  } from "react";
import PrimaryUploadButton from "../../../../components/PrimaryUploadButton/PrimaryUploadButton";
import PrimaryTextArea from "../../../../components/PrimaryTextArea/PrimaryTextArea";
import PrimaryUploadImageButton from "../../../../components/PrimaryUploadImageButton/PrimaryUploadImageButton";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import CapTableModal from "./infoModals/CapTableModal";
import IdProofModal from "./infoModals/IdProofModal";
import BankInfoModal from "./infoModals/BankInfoModal";
import AcraDocModal from "./infoModals/AcraDocModal";
import ConfigData from "../../../../config";
import TextModal from "../../../../components/Modal/TextModal";
import IndustrySearchBarDropdown from "../../../retailInvestorRegistration/IndustrySearchBarDropdown";
import allCategories from "../../../retailInvestorRegistration/allCategories";
import InterestedIndustries from "../../../retailInvestorRegistration/InterestedIndustries";

// React query
// import { useQuery } from 'react-query'

// For redux
import { useSelector } from 'react-redux'
import { getID } from '../../../../store/auth'

// React query fetch functions
// const fetchStartupById = async (key) => {
//     const res = await fetch(ConfigData.SERVER_URL + '/db/startup/' + key.queryKey[1])
//     return res.json()
// }

function AccountVerification(){
    // Get QueryClient from the context
    // const queryClient = useQueryClient()

    const startupId = useSelector(getID)

    const [businessDescription, setBusinessDescription] = useState("")
    const [zilAddr, setZilAddr] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const [showModal, setShowModal] = React.useState({
        capTable: false,
        acraDoc: false,
        bankInfo: false,
        idProof: false
    });
    const [showError, setShowError] = useState(false)
    const [resError, setResError] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [ interestedIndustries, setInterestedIndustries ] = useState([])

    // const { data, status } = useQuery(['startupDetails', startupId], fetchStartupById)

    // useEffect(() => {
    //     if (status === 'success') {
    //         console.log("Updated")
    //         if (data.zilAddr) { setZilAddr(data.zilAddr) }
    //         if (data.profileDescription) { setBusinessDescription(data.profileDescription) } 
    //     }
    // });

    // function updateStates(data) {
    //     if (data.zilAddr) { setZilAddr(data.zilAddr) }
    //     if (data.profileDescription) { setBusinessDescription(data.profileDescription) } 
        
    // }

    function launchInfoModal(selected) {
        function changeSelectedModalState() {
            setShowModal(prevState => ({
                ...prevState,
                [selected]: !prevState[selected]
            }))
        }
        return changeSelectedModalState;
    }

    const updateVerificationDetails = async () => {
        console.log(businessDescription)

        const response = await fetch(ConfigData.SERVER_URL + '/db/startup/' + startupId, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                "profileDescription": businessDescription,
                "zilAddr": zilAddr
            }) 
        })

        const status = await response.status
        if (status === 200) {
            const res = await response.json()
            console.log(res)

            setShowSuccess(true)
            setSuccessMessage("Submitted: " + res.message)

        } else {
            const error = await response.json()
            console.log("Error", error)

            setShowError(true)
            setResError("Error " + error.error.status + ": " + error.error.message)
        }

        // Update startup related industries
        if (interestedIndustries.length !== 0) {
            const updateIndustryData = {
                "industryArr": interestedIndustries,
                "id": startupId,
                "accountType": "startup"
            }

            const updateIndustry = await fetch(ConfigData.SERVER_URL + '/db/startup/industries/addIndustries/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(updateIndustryData)
            })
            
            const updateIndustryStatus = updateIndustry.status
            if (updateIndustryStatus === 200) {
                const res = await updateIndustry.json()
                console.log(res)
            } else {
                const error = await updateIndustry.json()
                console.log("Error updating user fields: ", error)
            }
        }
    }

    function closeModal() {
        function changeSelectedModalState() {
            setShowError(false)
            setShowSuccess(false)
        }
        return changeSelectedModalState;
    }

    function addInterestedIndustriesFunc(industry) {
        function addSelectedMilestone(selected) {
            if (!handleCheck(selected)) {
                const newList = [selected, ...interestedIndustries]
                setInterestedIndustries(newList)
            }
        }
        
        return addSelectedMilestone(industry)
    }

    function handleCheck(item) {
        return interestedIndustries.some(industry => item.id === industry.id)
    }

    function removeInterestedIndustry(id) {
        function remove(selected) {
            const removedArr = [...interestedIndustries].filter(industry => industry.id !== selected)
            setInterestedIndustries(removedArr)
        }

        return remove(id)
    }

    return(
        <>
            <div className="bg-white px-10 sm:px-24 py-16 rounded-xl space-y-4 shadow-lg h-full w-full flex flex-wrap flex-col items-center">
                <p className="bg-red-400 text-white px-4 rounded-md">{errorMessage}</p>
                <div className="h-1/2 flex flex-wrap md:flex-row w-full flex-col justify-between m-0">
                    <div className="flex flex-wrap flex-col justify-items-stretch md:w-1/2 h-full w-full">
                        <TextModal header="Error" showModal={showError} setShowModal={closeModal()} 
                                content={resError}
                                />
                        <PrimaryUploadButton text="Upload CAP Table" moreInfo={true} labelId="capTable"
                                             moreInfoFunc={launchInfoModal} errorFunc={setErrorMessage}
                                             Modal={
                                                 <>
                                                    <CapTableModal showModal={showModal.capTable} setShowModal={launchInfoModal} id="capTable"/>
                                                 </>
                                             }
                                            startupId={startupId}
                        />
                        <PrimaryUploadButton text="Upload ACRA Documents" moreInfo={true} labelId="acraDocuments"
                                             moreInfoFunc={launchInfoModal} errorFunc={setErrorMessage}
                                             Modal={
                                                 <>
                                                    <AcraDocModal showModal={showModal.acraDoc} setShowModal={launchInfoModal} id="acraDocuments"/>
                                                 </>
                                             }
                                             startupId={startupId}
                        />
                        <PrimaryUploadButton text="Bank Information" moreInfo={true} labelId="bankInfo"
                                             moreInfoFunc={launchInfoModal} errorFunc={setErrorMessage}
                                             Modal={
                                                 <>
                                                     <BankInfoModal showModal={showModal.bankInfo} setShowModal={launchInfoModal} id="bankInfo"/>
                                                 </>
                                             }
                                             startupId={startupId}
                        />
                        <PrimaryUploadButton text="Upload Identification Proof" moreInfo={true} labelId="idProof"
                                             moreInfoFunc={launchInfoModal} errorFunc={setErrorMessage}
                                             Modal={
                                                 <>
                                                     <IdProofModal showModal={showModal.idProof} setShowModal={launchInfoModal} id="idProof"/>
                                                 </>
                                             }
                                             startupId={startupId}
                        />
                    </div>
                    <div className="flex flex-wrap w-1/3">
                        <PrimaryUploadImageButton text="Upload Profile Picture" properties="w-full justify-center"
                                                  labelId="profilePhoto" errorFunc={setErrorMessage} startupId={startupId} />
                    </div>
                </div>
                <PrimaryTextArea placeholder="Zil address" properties="w-full h-12" onChangeFunc={setZilAddr} value={zilAddr}/>
                <PrimaryTextArea placeholder="Short Description of your Business" properties="w-full h-40" onChangeFunc={setBusinessDescription} value={businessDescription}/>
                
                <label className="block text-lg font-bold text-gray-700 px-5">Add related industries</label>
                <div className="h-1/2 flex flex-wrap md:flex-row w-full flex-col justify-between m-0">
                    <IndustrySearchBarDropdown options={allCategories} addInterestedIndustriesFunc={addInterestedIndustriesFunc} />
                    <div className="items-stretch px-4 xl:text-xl mb-4 font-Inter text-xs sm:text-base w-100 overflow-auto">
                        <InterestedIndustries industries={interestedIndustries} removeInterestedIndustry={removeInterestedIndustry} />
                    </div>
                </div>

                <TextModal header="Success" showModal={showSuccess} setShowModal={closeModal()} 
                                content={successMessage}/>
                <PrimaryButton text="Submit" properties="self-end" onClick={updateVerificationDetails}/>
            </div>
        </>
    )
}

export default AccountVerification;