import React, { useState, useEffect } from "react";
import CommercialChampionItem from "./CommercialChampionItem";
import Image1 from './image1.png'
import Image2 from './image2.png'
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import { getKeyByValue } from "../../../../helpers";

function CommercialChampion(){
    const [selected, setSelected] = useState(null)
    const [commercialChampions, setCommercialChampions] = useState(null)

    function selectChampion(id){
        const selectedChampion = getKeyByValue(selected, true)

        if (selectedChampion && id !== selectedChampion){
            setSelected(prevState => ({
                ...prevState,
                [id]: !prevState[id],
                [selectedChampion]: !prevState[selectedChampion]
            }))
        }
        else if (id !== selectedChampion){
            setSelected(prevState => ({
                ...prevState,
                [id]: !prevState[id],
            }))
        }
        else{
            console.log("Unexpected Selection occurred")
        }
    }

    function saveCommercialChampion(){
        console.log("Saving Selected Commercial Champion to Server")
    }

    useEffect(() =>{
            console.log("Obtained Commercial Champions from API")

            // TO replace with actual API and Image Links
            const commercialChampionsJSON = {
                "commercialChampions":[
                    {"name": "Kenny", "title": "NUS Commercial Champion", "profilePic":Image1, "id":0 },
                    {"name": "David", "title": "SUTD Commercial Champion", "profilePic":Image2, "id":1 }
                ]
            }
            setCommercialChampions(commercialChampionsJSON.commercialChampions)

            const initialSelectedObj = commercialChampionsJSON.commercialChampions.reduce((acc, cur)=>({ ...acc, [cur.id]: false }), {})
            setSelected(initialSelectedObj)
            console.log(selected)
        },[]
    )

    // TODO ERROR MESSAGE, not null
    // TODO Skipping bottom arrow function, might change

    return (
        <>
            <div className="bg-white px-6 sm:px-24 py-16 rounded-xl space-y-4 shadow-lg h-full w-full flex flex-wrap flex-col items-center">
                {
                    commercialChampions !== null ?
                        commercialChampions.map((champion, index) => (
                            <CommercialChampionItem name={champion.name} key={index} profilePic={champion.profilePic}
                                                    title={champion.title} selected={selected[champion.id]} onClick={() => selectChampion(champion.id)} />
                        ))
                        : null
                }
                {
                    commercialChampions !== null ?
                        <PrimaryButton text="Submit" properties="self-end" onClick={saveCommercialChampion}/>
                        : null
                }
            </div>
        </>
    )
}

export default CommercialChampion;