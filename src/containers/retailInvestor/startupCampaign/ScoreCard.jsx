import React from "react";
import PropTypes from "prop-types";
import { sumValues } from "../../../helpers";
import Astra from './Astra.svg'

function ScoreCard({ ratings }){
    return(
        <>
            <p className="font-Inter text-center md:text-xl underline">Scorecard</p>
            <br/>
            <div className="flex flex-col space-y-1 space-x-1 sm:space-x-0">
                <div className="flex flex-row">
                    <p className="font-Inter font-bold text-xs md:text-lg lg:text-xl w-1/2 text-right self-center">Team Synergy</p>
                    <p className="font-Inter text-xs md:text-lg lg:text-xl w-1/2 self-center text-center">{ratings.teamSynergy}/10</p>
                </div>
                <div className="flex flex-row space-x-1 sm:space-x-0">
                    <p className="font-Inter font-bold text-xs md:text-lg lg:text-xl w-1/2 text-right self-center">Innovation</p>
                    <p className="font-Inter text-xs md:text-lg lg:text-xl w-1/2 self-center text-center">{ratings.innovation}/10</p>
                </div>
                <div className="flex flex-row space-x-1 sm:space-x-0">
                    <p className="font-Inter font-bold text-xs md:text-lg lg:text-xl w-1/2 text-right self-center">Creativity</p>
                    <p className="font-Inter text-xs md:text-lg lg:text-xl w-1/2 self-center text-center">{ratings.creativity}/10</p>
                </div>
                <div className="flex flex-row space-x-1 sm:space-x-0">
                    <p className="font-Inter font-bold text-xs md:text-lg lg:text-xl w-1/2 text-right self-center">Total</p>
                    <p className="font-Inter text-xs md:text-lg lg:text-xl w-1/2 self-center text-center">{sumValues(ratings)}/30</p>
                </div>
                <div className="flex flex-row w-full justify-end">
                    <p className="text-xs self-end text-gray-500">Validated by</p>
                    <img src={Astra} alt="Astra Logo" className="self-end"/>
                </div>
                <div className="border-b-2"></div>
            </div>
        </>
    )
}

ScoreCard.propTypes = {
    ratings: PropTypes.object
}

export default ScoreCard;