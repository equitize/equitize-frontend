import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton";
import checkBoxFilledIcon from "../../../../startupRegistration/checkBoxFilled.svg";
import checkBoxGrayIcon from "../../../../startupRegistration/checkBoxGray.svg";

function AddInterestsModal({ categoryList, saveChanges }) {
    const [showModal, setShowModal] = useState(false);
    const [tempInterestList, setTempInterestList] = useState(categoryList || [])

    function saveAndClose(){
        saveChanges()
        setShowModal(!showModal)
    }

    function onInterestItemClick(interestItem){
        const newInterestList = tempInterestList.map(item => {
            if (interestItem === item){
                return {
                    ...item,
                    ...{ checked: !item.checked}
                }
            }
            else return item
        })
        setTempInterestList(newInterestList)
    }

    useEffect(()=>{
        setTempInterestList(categoryList || [])
    }, [showModal])

    return (
        <>
            <div className="items-stretch xl:text-xl mb-4 font-Inter text-xs sm:text-base w-100 overflow-auto cursor-pointer">
                <div className="inline-flex w-auto justify-between ml-1 bg-blue-700 px-2 rounded-full items-center text-sm my-1">
                    <div className="font-Inter text-white p-2" onClick={() => setShowModal(true)}>Add More</div>
                </div>
            </div>
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
                                <div className="flex items-start justify-between p-5 rounded-t lg:px-8">
                                    <h3 className="text-xl md:text-2xl lg:text-5xl font-bold lg:font-semibold items-center w-full text-center lg:px-48">
                                        Add Interests
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="py-6 px-20 flex flex-col align-middle justify-center space-y-3">
                                    {
                                        tempInterestList.map((item) => (
                                            <div className="flex flex-row md:px-2 space-x-4 items-center justify-center" key={item.id} onClick={() => onInterestItemClick(item)}>
                                                <div className="flex w-1/3 md:justify-end cursor-pointer">
                                                    {
                                                        item.checked ?
                                                            <img src={checkBoxFilledIcon} alt="Checked" />
                                                            :
                                                            <img src={checkBoxGrayIcon} alt="Not Checked" />
                                                    }
                                                </div>
                                                <p className="font-Inter text-xs md:text-base w-full lg:text-lg">{item.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="pb-4 flex flex-wrap align-middle self-end p-2">
                                    <PrimaryButton onClick={saveAndClose} text="Apply Changes"/>
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

AddInterestsModal.propTypes = {
    categoryList: PropTypes.array,
    saveChanges: PropTypes.func
}


export default AddInterestsModal;