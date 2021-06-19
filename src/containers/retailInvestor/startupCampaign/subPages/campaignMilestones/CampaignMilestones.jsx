import React from 'react'
import PropTypes from 'prop-types';
import GrayDot from  './GrayDot.svg'
import BlueDot from './BlueDot.svg'
import VerticalLine from './VerticalLine.svg'
import { formattedSum } from "../../../../../helpers";

function CampaignMilestones({ startupObject, campaignMilestones }){

    return (
        <>
            <div className="flex flex-row space-x-4">
                <img src={GrayDot} alt="Campaign Goal Indicator" />
                <p className="font-Inter text-sm md:text-base font-bold">CAMPAIGN GOAL: (S${formattedSum(startupObject.campaignGoal)})</p>
            </div>
            <img src={VerticalLine} alt="Next Milestone Indicator" className="w-px self-start m-3"/>
            {
                campaignMilestones ?
                    campaignMilestones.map((item, index) => (
                        campaignMilestones.length !== index + 1 ?
                            <div key={index}>
                                <div className="flex flex-row space-x-4 w-full">
                                    <div className="flex flex-col h-full">
                                        <img src={BlueDot} alt="Campaign Goal Indicator" className="self-start" />
                                        <img src={VerticalLine} alt="Next Milestone Indicator" className="h-full self-start m-3"/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5 w-full">
                                        <p className="font-Inter text-sm md:text-base font-bold uppercase">{item.title}</p>
                                        <p className="font-Inter text-sm md:text-base font-bold uppercase">Start date : {item.date}</p>
                                        <p className="font-Inter text-xs md:text-sm text-gray-400 uppercase">{item.description}</p>
                                        <p className="font-Inter text-sm md:text-base font-bold uppercase text-center">{item.percentageFunds}% of the funds unlocked</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div key={index}>
                                <div className="flex flex-row space-x-4 w-full">
                                    <div className="flex flex-col h-full">
                                        <img src={BlueDot} alt="Campaign Goal Indicator" className="self-start" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5 w-full">
                                        <p className="font-Inter text-sm md:text-base font-bold uppercase">{item.title}</p>
                                        <p className="font-Inter text-sm md:text-base font-bold uppercase">Start date : {item.date}</p>
                                        <p className="font-Inter text-xs md:text-sm text-gray-400 uppercase">{item.description}</p>
                                        <p className="font-Inter text-sm md:text-base font-bold uppercase text-center">{item.percentageFunds}% of the funds unlocked</p>
                                    </div>
                                </div>
                            </div>
                    ))
                    : null
            }
            <br />
            <br />
        </>
    )
}

CampaignMilestones.propTypes = {
    startupObject: PropTypes.object.isRequired,
    campaignMilestones: PropTypes.array
}

export default CampaignMilestones;