import React, { useState } from "react";
import PurpleDot from "./purpledot.svg";
import EditIcon from "./edit.svg";
import PropTypes from 'prop-types';
import EditMilestoneModal from "./EditMilestoneModal";
import CampaignGoalModal from "./CampaignGoalModal";

function MilestoneItem({ editMilestoneFunc, milestone, goal, editCampaignGoal, deleteMilestoneFunc }){
    const [showModal, setShowModal] = useState(false);

    function openEditModal(){
        setShowModal(!showModal)
    }

    if (goal){
        return (
            <div className="flex flex-row justify-between lg:justify-center items-center sm:space-x-6 px-12 w-full my-2">
                <img src={PurpleDot} alt="Purple Dot" className="h-6"/>
                <p className="font-bold font-Rubik text-sm lg:text-xl  w-1/2">Campaign Goal (S${goal.goal})</p>
                <img src={EditIcon} alt="Edit Details" onClick={openEditModal} className="h-7" />
                <CampaignGoalModal ModalFunc={openEditModal} showModal={showModal}
                                   editCampaignGoal={editCampaignGoal} campaignGoal={goal} />
            </div>
        )
    }

    else{
        return(
            <div className="flex flex-row justify-between lg:justify-center items-center sm:space-x-6 px-12 w-full my-2">
                <img src={PurpleDot} alt="Purple Dot" className="h-6 self-start"/>
                <div className="flex flex-col w-1/2 md:flex-grow lg:flex-none ">
                    <p className="font-bold font-Rubik text-sm md:text-md lg:text-xl">{milestone.title}</p>
                    <p className="text-gray-500 font-Rubik text-xs lg:text-md ">END DATE : {milestone.endDate}</p>
                    <p className="text-gray-400 font-Rubik text-xs lg:text-sm ">{milestone.description}</p>
                    <p className="font-Rubik text-xs lg:text-md self-center">{milestone.percentageFunds}% OF THE FUNDS UNLOCKED</p>
                </div>
                <img src={EditIcon} alt="Edit Details" onClick={openEditModal} className="h-7" />
                <EditMilestoneModal details={milestone} editMilestoneFunc={editMilestoneFunc}
                                    showModal={showModal} ModalFunc={openEditModal} deleteMilestoneFunc={deleteMilestoneFunc} />
            </div>
        )
    }
}

MilestoneItem.propTypes ={
    editMilestoneFunc: PropTypes.func,
    milestone: PropTypes.object,
    goal: PropTypes.object,
    editCampaignGoal: PropTypes.func,
    deleteMilestoneFunc: PropTypes.func
}

export default MilestoneItem;