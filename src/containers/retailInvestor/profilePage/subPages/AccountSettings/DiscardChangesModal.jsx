import React, { useState } from "react";
import PropTypes from 'prop-types';
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton";

function DiscardChangesModal({ discardChanges }) {
    const [showModal, setShowModal] = useState(false);

    function discardAndClose(){
        discardChanges()
        setShowModal(!showModal)
    }

    return (
        <>
            <PrimaryButton text="Discard" onClick={() => setShowModal(true)} />
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
                                    onClick={() => setShowModal(false)}
                                >
                                    <p className="bg-transparent text-black h-6 w-6 text-2xl focus:outline-none">
                                        ×
                                    </p>
                                </button>
                                {/*body*/}
                                <div className="py-6 px-20 flex flex-col align-middle justify-center space-y-3">
                                    <p className="font-Inter text-xs font-bold sm:text-base md:text-xl">You have unsaved progress. Are you sure you want to discard changes?</p>
                                </div>
                                <div className="pb-4 flex flex-wrap align-middle self-end p-2">
                                    <PrimaryButton onClick={discardAndClose} text="Yes"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    );
}

DiscardChangesModal.propTypes = {
    discardChanges: PropTypes.func
}

export default DiscardChangesModal;