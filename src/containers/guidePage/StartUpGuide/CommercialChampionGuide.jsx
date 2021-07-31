import React from "react";
import Charts from "../icons/Charts.svg";
import Sprint from "../icons/Sprint.svg";
import Judges from "../icons/Judges.svg";


function CommercialChampionGuide(){

    return (
        <div className="flex flex-col w-full p-4 lg:p-8 space-y-8">
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Mentorship Opportunities with our commercial champions</p>
                <div className="flex flex-row space-x-6">
                    <img src={Charts} alt="Charts Icon" className="w-16 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">We understand that new entrepreneurs like yourself find starting a startup very daunting, but it doesn’t have to be! <b>Partner with one of of many commercial champions</b> who are <b>industry experts</b> across a diverse range of industries. Once you connect with one of our commercial champion, he or she will <b>be your mentor</b> to ensure your success!</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Design Sprint</p>
                <div className="flex flex-row space-x-6">
                    <img src={Sprint} alt="Sprint Icon" className="w-16 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Once your application has been completed, select an <b>available time period</b> to <b>participate in a design sprint</b> hosted by our commercial champions. We put our startups through a <b>mandatory intensive 1 week long design sprint</b> to <b>assess our startups</b> and also for your assigned mentors to <b>stretch your ideation and abilities</b> to the next level.</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Scorecard and preparation for fundraising campaign</p>
                <div className="flex flex-row space-x-6">
                    <img src={Judges} alt="Judges Icon" className="w-16 md:w-28" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Upon completion of the design sprint, <b>each startup will be given a scorecard</b> where they will be assessed on their <b>team synergy, innovation</b> and <b>creativity</b>. If you do well enough, this can potentially be a huge advantage moving into the fundraising stage!</p>
                </div>
            </div>
        </div>
    )
}

export default CommercialChampionGuide;