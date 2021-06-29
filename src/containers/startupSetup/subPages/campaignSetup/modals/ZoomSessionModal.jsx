import React from "react";
import PrimaryInput from "../../../../../components/PrimaryInput/PrimaryInput";
import PropTypes from "prop-types";
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton";

function ZoomSessionModal({ onChangeFunc, details, onSubmitFunc }){
    const [showModal, setShowModal] = React.useState(false);

    function ModalFunc(){
        setShowModal(!showModal)
    }

    return (
        <>
            <button className="bg-custom-blue hover:bg-blue-700 font-bold py-3 px-2 self-stretch text-white text-xs sm:text-sm lg:text-xl lg:px-5 rounded-xl w-full sm:mx-4"
                    onClick={ModalFunc}>
                <p>SET UP ZOOM SESSION FOR CAMPAIGN LAUNCH</p>
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
                                <div className="flex items-start justify-between p-5 rounded-t">
                                    <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold items-center w-full text-center">
                                        Zoom Session for Campaign Launch
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="p-6 flex flex-wrap align-middle justify-center ">
                                    <p className="my-4 lg:text-lg leading-relaxed font-Inter text-gray-500">
                                        This session is for you entrepreneurs to shine! Select a date and time for you to campaign your project and interact with investors!
                                    </p>
                                    <div className="flex flex-wrap flex-col w-full">
                                        <div className="flex flex-row justify-center items-center">
                                            <p className="bg-secondary text-white font-bold px-2 py-2 rounded-xl text-center w-1/2 sm:w-1/3 text-sm sm:text-base">Select a date</p>
                                            <PrimaryInput placeholder="dd/mm/yy" properties="text-center w-1/2 sm:w-1/3 text-xs md:text-md" onChange={(e) => onChangeFunc("date", e.target.value)}
                                                          value={details.date} type="date" />
                                        </div>
                                        <div className="flex flex-row justify-center items-center">
                                            <p className="bg-secondary text-white font-bold px-2 py-2 rounded-xl text-center w-1/2 sm:w-1/3 text-sm sm:text-base">Select a time</p>
                                            <div className="w-1/2 items-stretch sm:w-1/3 flex flex-col sm:flex-row justify-between sm:items-center m-4">
                                                <input className="rounded-xl bg-gray-100 placeholder-gray-400 font-Inter text-center py-2 text-xs sm:text-base"
                                                       placeholder="0000" onChange={(e) => onChangeFunc("startTime", e.target.value)}
                                                       value={details.startTime} type="time" />
                                                <p className="text-center text-xs md:text-base font-bold">TO</p>
                                                <input className="rounded-xl bg-gray-100 placeholder-gray-400 font-Inter text-center py-2 text-xs sm:text-base"
                                                       placeholder="2359" onChange={(e) => onChangeFunc("endTime", e.target.value)}
                                                       value={details.endTime} type="time" />
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <PrimaryButton properties="self-end" text="Submit" onClick={ () => { onSubmitFunc(); ModalFunc() } }/>
                                    </div>
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

ZoomSessionModal.propTypes = {
    onChangeFunc: PropTypes.func,
    onSubmitFunc: PropTypes.func,
    details: PropTypes.object,
    startupId: PropTypes.number
}


export default ZoomSessionModal;
