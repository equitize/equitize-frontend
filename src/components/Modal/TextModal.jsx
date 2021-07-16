import React from "react";
import PropTypes from 'prop-types';
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function TextModal({showModal, setShowModal, modalImg, header, content}){
    function closeModal(){
        setShowModal()
    }

    return(
        <>
            { showModal ? (
                <div className="space-x-0">
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-2"
                    >
                        <div className="w-auto my-auto mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <div className="w-1/3"></div>
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold items-center w-1/3 text-center">
                                        {header}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-90 w-1/9 float-right text-3xl text-center leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <p className="bg-transparent text-black h-6 w-6 text-2xl focus:outline-none">
                                            ×
                                        </p>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="pb-4 px-6 flex flex-wrap align-middle justify-center ">
                                    {
                                        modalImg ?
                                            <img src={modalImg} className="w-2/3" alt={header}/>
                                            : <></>
                                    }
                                    <p className="mt-4 text-blueGray-500 lg:text-lg leading-relaxed">
                                        {content}
                                    </p>
                                </div>
                                <div className="pb-4 flex flex-wrap align-middle justify-center test-confirm">
                                    <PrimaryButton onClick={closeModal} text="Confirm"/>
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

TextModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    modalImg: PropTypes.element,
    id: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string
}

export default TextModal;