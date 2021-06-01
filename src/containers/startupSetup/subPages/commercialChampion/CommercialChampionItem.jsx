import React from "react";
import PropTypes from 'prop-types';
import checkBoxFilledIcon from "../../../startupRegistration/checkBoxFilled.svg";
import checkBoxGrayIcon from "../../../startupRegistration/checkBoxGray.svg";

function CommercialChampionItem({ name, title, profilePic, selected, onClick }){
    return (
        <>
            <div className="px-6 sm:px-10 py-16 rounded-xl space-y-0 md:space-y-4 h-full w-full flex flex-wrap flex-row items-center" onClick={onClick}>
                <div className="w-1/5 flex flex-wrap flex-col items-center justify-center">
                    <img src={profilePic} alt={name}/>
                    <br />
                    <p className="font-Rubik text-xs sm:text-sm lg:text-base text-center">{name}</p>
                    <p className="font-Rubik text-xs sm:text-sm lg:text-base text-center">{title}</p>
                </div>
                <div className="w-1/5"/>
                <div className="w-3/5 flex flex-row space-x-1">
                    <p className="font-Rubik text-xs sm:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget ligula sed augue aliquam vehicula et at risus. Donec nec faucibus orci. Mauris in malesuada nunc. Sed suscipit fermentum euismod. Nullam arcu purus, semper at ligula at, sagittis commodo eros.</p>
                    {
                        selected ?
                            <img src={checkBoxFilledIcon} alt="Selected" className="self-start"/>
                            :
                            <img src={checkBoxGrayIcon} alt="Not Selected" className="self-start"/>
                    }
                </div>
            </div>
        </>
    )
}

CommercialChampionItem.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CommercialChampionItem;