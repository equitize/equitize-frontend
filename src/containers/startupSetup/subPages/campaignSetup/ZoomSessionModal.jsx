import React from "react";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";

function ZoomSessionModal(){
    const [showModal, setShowModal] = React.useState(false);

    function onClickFunc(){
        setShowModal(true)
    }

    return (
        <>
            <button className="bg-custom-blue hover:bg-blue-700 font-bold py-3 px-2 self-stretch text-white text-xs sm:text-sm lg:text-xl lg:px-5 rounded-xl w-full sm:mx-4"
                    onClick={onClickFunc}>
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
                                    onClick={() => setShowModal(false)}
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
                                    <p className="my-4 lg:text-lg leading-relaxed font-Inter">
                                        This session is for you entrepreneurs to shine! Select a date and time for you to campaign your project and interact with investors!
                                    </p>
                                    <div className="flex flex-wrap flex-row w-full">
                                        <div className="w-1/2 flex flex-col">
                                            <PrimaryButton text="Select a date" />
                                        </div>
                                        <div className="w-1/2 flex flex-col">

                                        </div>
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




export default ZoomSessionModal;
