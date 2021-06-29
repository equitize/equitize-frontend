import React, { useState } from "react";
import PropTypes from "prop-types";
import MilestoneItem from "./MilestoneItem";
import AddMilestoneModal from "./AddMilestoneModal";

function MilestoneModal({ details, addMilestonesFunc, editMilestoneFunc, deleteMilestoneFunc, setCampaignGoal }){
    const [showModal, setShowModal] = useState(false);

    function ModalFunc(){
        setShowModal(!showModal)
    }

    return (
        <>
            <button className="bg-custom-blue hover:bg-blue-700 font-bold py-3 px-2 self-stretch text-white text-xs sm:text-sm lg:text-xl lg:px-5 rounded-xl w-full sm:mx-4"
                    onClick={ModalFunc}>
                <p>SET UP PROPOSED CAMPAIGN MILESTONES</p>
            </button>
            {showModal ? (
                <div className="space-x-0">
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-2"
                    >
                        <div className="w-auto my-auto mx-auto max-w-5xl">
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
                                    <h3 className="text-xl md:text-2xl lg:text-5xl font-bold lg:font-semibold items-center w-full text-center">
                                        Proposed Campaign Milestones
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="p-6 flex flex-wrap align-middle justify-center flex-col w-full">
                                    <MilestoneItem campaignGoal={details.campaignGoal} editCampaignGoal={setCampaignGoal} />
                                    {
                                        details.milestones.length > 0 ?
                                            details.milestones.map((milestone, index) => (
                                                <MilestoneItem key={index} milestone={milestone}
                                                               editMilestoneFunc={editMilestoneFunc(index)}
                                                               deleteMilestoneFunc={deleteMilestoneFunc(index)} />
                                            ))
                                            : null
                                    }
                                </div>
                                <AddMilestoneModal addMilestonesFunc={addMilestonesFunc} currentMilestoneLength={details.milestones.length} />
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    )

}


MilestoneModal.propTypes = {
    details: PropTypes.object,
    addMilestonesFunc: PropTypes.func,
    editMilestoneFunc: PropTypes.func,
    deleteMilestoneFunc: PropTypes.func,
    setCampaignGoal: PropTypes.func
}

export default MilestoneModal;