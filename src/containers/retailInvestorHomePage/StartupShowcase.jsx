import React from "react";
import PropTypes from "prop-types";
import FeaturedStartup from "./FeaturedStartup";
import RecommendedStartups from "./RecommendedStartups";
// import MeetupMouse from './tempImages/MeetupMouse.svg'
import Gover from './tempImages/Gover.png'
import Invern from './tempImages/Invern.png'
import Rocketeer from './tempImages/Rocketeer.png'
import IceBerk from './tempImages/IceBerk.png'
import PlantPeace from './tempImages/PlantPeace.png'
import ShareNow from './tempImages/ShareNow.png'

// React query
import { useQuery } from 'react-query'

// React query fetch functions
const getRecommendedStartups = async (key) => {
    const res = await fetch('http://localhost:8080/api/db/retailInvestors/recommender/' + key.queryKey[1])
    return res.json()
}

function StartupShowcase({ searchTerms }){

    // React query fetch requests
    const { data, status } = useQuery(['recommendedStartups', 1], getRecommendedStartups)   //TODO: Hardcoded 1 for retail investor I

    // console.log("First startup", firstStartup)

    // TODO Details for object TBC
    // const featuredStartupObject = {
    //     name: "Meetup Mouse",
    //     description: "Meetup Mouse suggests the BEST hand-picked places for your group’s needs so you and your friends NEVER worry about where to eat again!",
    //     fundedAmount: 200000,
    //     sharesAllocated: "20",
    //     campaignGoal: 500000,
    //     endTime: "47",
    //     id: 1,
    //     imageLink: MeetupMouse
    // }

    const featuredStartupPlaceholder = {
        "id": 1,
        "companyName": "wingkit",
        "emailAddress": "wingkit@gmail.xyz",
        "companyPassword": "Password123!",
        "profileDescription": "describe",
        "profilePhoto": "",
        "capTable": "",
        "acraDocuments": "",
        "pitchDeckCloudID": "",
        "pitchDeckOriginalName": "",
        "videoCloudID": "",
        "videoOriginalName": "",
        "commericalChampion": "",
        "designSprintDatetime": "",
        "bankInfo": "",
        "idProof": "",
        "zilAddr": "",
        "createdAt": "2021-06-30T10:39:48.000Z",
        "updatedAt": "2021-06-30T10:39:48.000Z",
        "milestones": [],
        "industries": [],
        "campaigns": [{
            "id": 1,
            "goal": 500000,
            "currentlyRaised": 5224,
            "zoomDatetime": "2021-06-22,21:45,20:45",
            "startDate": null,
            "endDate": null,
            "sharesAllocated": 10,
            "campaignDescription": "fdgfg",
            "tokensMinted": 100000,
            "campaignAddr": null,
            "fungibleTokenAddr": null,
            "liveStatus": false,
            "createdAt": "2021-06-30T10:44:50.000Z",
            "updatedAt": "2021-06-30T10:47:41.000Z",
            "startupId": 1
        }]
    }

    const recommendedStartups = [
        {
            name: "Gover",
            description: "Easily plan, navigate and track great cycle routes with Gover from over 30,000 registered riders",
            fundedAmount: 300000,
            sharesAllocated: 15,
            campaignGoal: 375000,
            endTime: "14",
            id: 2,
            imageLink: Gover
        },
        {
            name: "Invern",
            description: "Bespoke lamps that change its colour based on the temperature and the time of the day",
            fundedAmount: 30000,
            sharesAllocated: 15,
            campaignGoal: 60000,
            endTime: "39",
            id: 3,
            imageLink: Invern
        },
        {
            name: "Rocketeer",
            description: "Ever wanted to build your own mini rocket? Now you can at your backyard with Rocketeer!",
            fundedAmount: 90000,
            sharesAllocated: 20,
            campaignGoal: 100000,
            endTime: "24",
            id: 4,
            imageLink: Rocketeer
        },
        {
            name: "ShareNow",
            description: "A mobile based application that helps you connect Android and iOS devices so you can share media easily!",
            fundedAmount: 100000,
            sharesAllocated: 25,
            campaignGoal: 125000,
            endTime: "16",
            id: 5,
            imageLink: ShareNow
        },
        {
            name: "PlantPeace",
            description: "Suffering from anxiety or bouts of stress? PlantPeace offers cirriculums on mediation for you to grow spiritually.",
            fundedAmount: 80000,
            sharesAllocated: 15,
            campaignGoal: 100000,
            endTime: "27",
            id: 6,
            imageLink: PlantPeace
        },
        {
            name: "IceBerk",
            description: "Slow Network speeds at home? IceBerk Technologies helps homes improve network reliability and speed on a simple click.",
            fundedAmount: 45000,
            sharesAllocated: 20,
            campaignGoal: 450000,
            endTime: "14",
            id: 7,
            imageLink: IceBerk
        }
    ]

    // TODO Search Results Implementation

    return(
        <>
            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {
                data.id === undefined ? (
                    <>
                        {
                            searchTerms !== "" ?
                                <div>
                                    <p>{searchTerms}</p>
                                </div>
                                :
                                <div className="w-full flex flex-col space-y-4">
                                    <FeaturedStartup info={featuredStartupPlaceholder}/>
                                    <RecommendedStartups startups={recommendedStartups}/>
                                </div>
                        }
                    </>
                    )
                    : (
                        <>
                            {
                                searchTerms !== "" ?
                                    <div>
                                        <p>{searchTerms}</p>
                                    </div>
                                    :
                                    <div className="w-full flex flex-col space-y-4">
                                        <FeaturedStartup info={data[0]}/>
                                        <RecommendedStartups startups={recommendedStartups}/>
                                    </div>
                            }
                            </>
                    )
            }
        </>
    )
}


StartupShowcase.propTypes = {
    searchTerms: PropTypes.string
}

export default StartupShowcase;