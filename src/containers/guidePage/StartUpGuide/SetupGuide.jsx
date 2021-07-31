import React from "react";
import CheckList from '../icons/Checklist.svg'
import Location from '../icons/Location.svg'
import Zoom from '../icons/Zoom.svg'


function SetupGuide(){

    return (
        <div className="flex flex-col w-full p-4 lg:p-8 space-y-8">
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Document Preparation</p>
                <div className="flex flex-row space-x-6">
                    <img src={CheckList} alt="Checklist Icon" className="w-16 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">We keep our <b>sign up process</b> as <b>simple</b> and <b>hassle free</b> as we can. To sign up and verify your company, you will need to prepare your startup <b>CAP table</b>, <b>ACRA document</b>, <b>Bank Information</b> and <b>Identification Proof</b> along with <b>accompanying campaign materials</b> you might have.</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Milestone System</p>
                <div className="flex flex-row space-x-6">
                    <img src={Location} alt="Location Icon" className="w-16 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Our company has a <b>unique milestone system</b> powered by our blockchain technology through <b>smart contracts</b> to <b>protect investors’ money</b> where only upon <b>completion of the milestone deliverables</b>, a <b>percentage of the funds will be unlocked to you</b>. Propose a set of reasonable milestones and the percentage of funds unlocked for each milestone for our approval.</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Zoom Campaign Meetings</p>
                <div className="flex flex-row space-x-6">
                    <img src={Zoom} alt="Zoom Icon" className="w-16 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify"><b>Select a date</b> where you will hold your <b>campaign meeting</b> over Zoom! This is your time to shine and <b>showcase your brightest ideas</b> to prospective investors!</p>
                </div>
            </div>
        </div>
    )
}

export default SetupGuide;