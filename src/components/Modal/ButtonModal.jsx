import React, { useState } from "react";
import FormButton from "../FormButton/FormButton";
import PropTypes from 'prop-types';
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function ButtonModal({ text, onClick, modalImg }) {
    const [showModal, setShowModal] = useState(false);

    function onClickFunc(){
        onClick()
        setShowModal(true)
    }

    return (
        <>
            <FormButton onClick={onClickFunc} text={text}/>
            {showModal ? (
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
                                        {text}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-90 w-1/9 float-right text-3xl text-center leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <p className="bg-transparent text-black h-6 w-6 text-2xl focus:outline-none">
                                          ×
                                        </p>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="p-6 flex flex-wrap align-middle justify-center ">
                                    {
                                        modalImg ?
                                            <img src={modalImg} className="w-2/3" alt={text}/>
                                            : <></>
                                    }
                                    <p className="my-4 text-blueGray-500 lg:text-lg leading-relaxed">
                                        Morbi sagittis mi sed mi feugiat placerat. Vivamus sagittis pulvinar dapibus. Aliquam vitae commodo justo, in tincidunt justo. Nam tempus ante nulla, non aliquet arcu maximus at. Fusce posuere rutrum justo, et tincidunt dui. Sed pharetra lorem sit amet vehicula tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur vehicula purus ut lacus tempus, et laoreet urna efficitur.
                                    </p>
                                    <p className="my-4 text-blueGray-500 lg:text-lg leading-relaxed">
                                        Cras euismod tempor arcu. Nulla at lacus vel arcu euismod tristique ac sed odio. Etiam sed justo et quam vehicula vehicula non sed arcu. Nullam condimentum erat diam, sit amet pellentesque nulla elementum non. Nam et arcu a diam finibus pulvinar. Aliquam id consectetur nisl, vitae luctus odio. Maecenas malesuada turpis sit amet porttitor pulvinar.
                                    </p>
                                </div>
                                <div className="pb-4 flex flex-wrap align-middle justify-center test-confirm">
                                    <PrimaryButton onClick={() => setShowModal(false)} text="Confirm"/>
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

ButtonModal.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    modalImg: PropTypes.element
}


export default ButtonModal;