import React, { useState } from "react";
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton";
import PropTypes from "prop-types";

function DeleteMilestoneModal({ deleteMilestoneFunc, ModalFunc }){
    const [showModal, setShowModal] = useState(false);

    function openModal(){
        setShowModal(!showModal)
    }

    function deleteSelectedMilestone(){
        deleteMilestoneFunc()
        ModalFunc()
        openModal()
    }

    return(
        <>
            <PrimaryButton properties="m-4" text="Delete" onClick={openModal}/>
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
                                    onClick={() => setShowModal(false)}
                                >
                                    <p className="bg-transparent text-black h-6 w-6 text-2xl focus:outline-none">
                                        ×
                                    </p>
                                </button>
                                {/*body*/}
                                <div className="p-6 flex flex-wrap align-middle justify-center">
                                    <p className="my-4 font-Inter text-xs md:text-base lg:text-lg leading-relaxed">
                                        Are you sure you want to delete this milestone?
                                    </p>
                                </div>
                                <PrimaryButton properties="m-4 self-end p-3" text="Yes" onClick={deleteSelectedMilestone} />
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    )
}

DeleteMilestoneModal.propTypes = {
    deleteMilestoneFunc: PropTypes.func,
    ModalFunc: PropTypes.func
}

export default DeleteMilestoneModal;