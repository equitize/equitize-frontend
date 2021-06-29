import React, { useState } from "react";
import PropTypes from "prop-types";
import PrimaryInput from "../../../../../components/PrimaryInput/PrimaryInput";
import PrimaryTextArea from "../../../../../components/PrimaryTextArea/PrimaryTextArea";
import { Range } from "react-range";
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton";
import DeleteMilestoneModal from "./DeleteMilestoneModal";


function EditMilestoneModal({ details, editMilestoneFunc, deleteMilestoneFunc, showModal, ModalFunc }){
    const [milestone, setMilestone] = useState({
        title: details.title,
        endDate: details.endDate,
        description: details.description,
        percentageFunds: details.percentageFunds
    })

    function setMilestoneProperties(selected) {
        function setSelectedMilestoneProperty(e) {
            setMilestone(prevState => ({
                ...prevState,
                [selected]: e.target.value
            }))
        }
        return setSelectedMilestoneProperty;
    }

    function setPercentageFunds(values){
        setMilestone(prevState => ({
            ...prevState,
            percentageFunds: values[0]
        }))
    }

    function saveEditedMilestone(){
        editMilestoneFunc(milestone)
        ModalFunc()
    }

    return (
        <>
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
                                    <h3 className="text-xl md:text-2xl lg:text-5xl font-bold lg:font-semibold items-center w-full text-center lg:px-48">
                                        Edit Milestone
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="p-6 flex flex-wrap align-middle justify-center flex-col w-full">
                                    <PrimaryInput placeholder="Milestone Title" properties="self-stretch"
                                                  value={milestone.title} onChange={setMilestoneProperties('title')} />
                                    <PrimaryInput placeholder="DD/MM/Y" type="date"
                                                  value={milestone.endDate} onChange={setMilestoneProperties('endDate')} />
                                    <PrimaryTextArea placeholder="Description" value={milestone.description}
                                                     onChangeFunc={setMilestoneProperties('description')}
                                                     alt={true} properties="m-4"/>
                                    <p className="my-4 lg:text-lg leading-relaxed font-Inter text-gray-500 mx-4">
                                        Select the percentage of remaining funds you want to be unlocked for this milestone
                                    </p>
                                    <div className="w-full px-4">
                                        <Range
                                            step={0.1}
                                            min={0}
                                            max={100}
                                            values={milestone.percentageFunds ? [milestone.percentageFunds] : [0]}
                                            onChange={setPercentageFunds}
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
                                                    className="w-5 h-5 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <div className="absolute font-Inter text-sm font-bold -top-7 p-1 -left-3 w-10">
                                                        <p className="text-active-purple text-center">{milestone.percentageFunds !== null ? [milestone.percentageFunds] : [0]}%</p>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <br/>
                                        {
                                            milestone.percentageFunds !== null ?
                                                <p className="text-lg font-bold font-Rubik text-center">{milestone.percentageFunds}% of remaining funds</p>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="w-full justify-between flex flex-row">
                                    <DeleteMilestoneModal ModalFunc={ModalFunc} deleteMilestoneFunc={deleteMilestoneFunc} />
                                    <PrimaryButton properties="m-4" text="Apply Changes" onClick={saveEditedMilestone} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    )
}



EditMilestoneModal.propTypes = {
    details: PropTypes.object,
    editMilestoneFunc: PropTypes.func,
    deleteMilestoneFunc: PropTypes.func,
    ModalFunc: PropTypes.func,
    showModal: PropTypes.bool
}

export default EditMilestoneModal;