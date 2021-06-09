import React, { useState } from "react";
import PrimaryUploadButton from "../../../../components/PrimaryUploadButton/PrimaryUploadButton";
import PrimaryTextArea from "../../../../components/PrimaryTextArea/PrimaryTextArea";
import PrimaryUploadImageButton from "../../../../components/PrimaryUploadImageButton/PrimaryUploadImageButton";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import CapTableModal from "./infoModals/CapTableModal";
import IdProofModal from "./infoModals/IdProofModal";
import BankInfoModal from "./infoModals/BankInfoModal";
import AcraDocModal from "./infoModals/AcraDocModal";

// For redux
import { useSelector } from 'react-redux'
import { getStartupId } from '../../../../store/auth'

function AccountVerification(){

    const startupId = useSelector(getStartupId)

    const [businessDescription, setBusinessDescription] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const [showModal, setShowModal] = React.useState({
        capTable: false,
        acraDoc: false,
        bankInfo: false,
        idProof: false
    });

    function launchInfoModal(selected) {
        function changeSelectedModalState() {
            setShowModal(prevState => ({
                ...prevState,
                [selected]: !prevState[selected]
            }))
        }
        return changeSelectedModalState;
    }

    function saveBusinessDescription(){
        console.log(businessDescription)
    }

    return(
        <>
            <div className="bg-white px-10 sm:px-24 py-16 rounded-xl space-y-4 shadow-lg h-full w-full flex flex-wrap flex-col items-center">
                <p className="bg-red-400 text-white px-4 rounded-md">{errorMessage}</p>
                <div className="h-1/2 flex flex-wrap md:flex-row w-full flex-col justify-between m-0">
                    <div className="flex flex-wrap flex-col justify-items-stretch md:w-1/2 h-full w-full">
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
                <PrimaryTextArea placeholder="Short Description of your Business" properties="w-full h-40" onChangeFunc={setBusinessDescription}/>
                <PrimaryButton text="Submit" properties="self-end" onClick={saveBusinessDescription}/>
            </div>
        </>
    )
}

export default AccountVerification;