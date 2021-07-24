import React from "react";
import PropTypes from "prop-types";
import FeaturedStartup from "./FeaturedStartup";
import RecommendedStartups from "./RecommendedStartups";
import ConfigData from "../../config";

// React query
import { useQuery } from 'react-query'

// For redux
import { useSelector } from 'react-redux'
import { getID, getToken } from '../../store/auth'

// React query fetch functions
const getRecommendedStartups = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/retailInvestors/recommender/' + key.queryKey[1], {
        headers: {
            'Authorization': 'Bearer ' + key.queryKey[2],
        },
    })
    return res.json()
}

function StartupShowcase({ searchTerms }){

    // Redux useSelector
    const retailInvestorID = useSelector(getID)
    const accessToken = useSelector(getToken)

    // React query fetch requests
    const { data, status } = useQuery(['recommendedStartups', retailInvestorID, accessToken], getRecommendedStartups)
    // console.log(status, data)
    // console.log(recommended)
    // console.log("First startup", firstStartup)

    var liveCampaigns = []
    if (status === "success") {
        liveCampaigns = data.filter( startup => startup.campaign.campaignStatus === "LIVE" )
    }
    // console.log('LIVE', liveCampaigns)

    return(
        <>
            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {liveCampaigns.length === 0 && (
                <div>No LIVE campaigns. Please check back again later.</div>
            )}

            {liveCampaigns.length > 0 && (
                <>
                {
                    searchTerms !== "" ?
                        <>
                            <RecommendedStartups startups={ liveCampaigns.filter((startup) => {
                                return startup.companyName.toLowerCase().includes(searchTerms.toLowerCase())
                            }) }/>
                        </>
                        :
                        <div className="w-full flex flex-col space-y-4">
                            <FeaturedStartup info={liveCampaigns[0]}/>
                            {
                                liveCampaigns.length > 1 ? <RecommendedStartups startups={ liveCampaigns.filter((v, i) => i !== 0) }/>
                                : null
                            }

                        </div>
                }
                </>
            )}
        </>
    )
}


StartupShowcase.propTypes = {
    searchTerms: PropTypes.string
}

export default StartupShowcase;
