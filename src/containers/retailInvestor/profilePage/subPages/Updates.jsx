import React, {useState} from "react";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import Chope from "./Updates/chope.svg";
import Congratulations from "./Updates/congratulations.svg";
import UpdatedStartups from "./Updates/UpdatedStartups";

const sampleData = [
    {
        "name": "MeetupMouse",
        "title": "Meetup Mouse is partnering with Chope!",
        "text": "Integer eget augue dolor. Aliquam sollicitudin, nibh in congue laoreet, ex elit sagittis mi, a aliquam velit metus et sapien. Phasellus vel tortor vel tellus mattis sagittis.",
        "id": 1,
        "image": Chope,
        "startupId": 1
    },
    {
        "name": "Grover",
        "title": "Grover is almost 80% funded! Thank you for all the support",
        "text": "Integer eget augue dolor. Aliquam sollicitudin, nibh in congue laoreet, ex elit sagittis mi, a aliquam velit metus et sapien.",
        "time": 27,
        "id": 2,
        "image": Congratulations,
        "startupId": 2
    }
]

function Updates(){
    const [filter, setFilter] = useState("All")
    const filteredData = sampleData.filter((item) => filter !== "All" ? item.name === filter : item)

    function handleChange(event) {
        setFilter(event.target.value)
    }

    function createSelectItems() {
        let items = [];
        for (let i = 0; i < sampleData.length; i++) {
            items.push(<option key={i} value={sampleData[i].name}>{sampleData[i].name}</option>);
        }
        return items;
    }

    return(
        <>
            <div className="flex flex-row justify-between space-x-4 self-stretch w-full">
                <p className="text-xl sm:text-2xl md:text-5xl font-bold">Updates</p>
                <select name="gender" className="rounded-xl border-2 placeholder-gray-400 px-2 py-2 xl:text-xl mb-4 mx-4 mt-1 font-Inter text-center text-xs sm:text-base"
                        onChange={(e) => handleChange(e)} defaultValue="All">
                    <option value="All">All</option>
                    {createSelectItems()}
                </select>
            </div>
            <br />
            <div className="space-y-4">
                <UpdatedStartups data={filteredData} />
            </div>
            <br />
            <PrimaryButton text="More" properties="self-end" />
        </>
    )
}

export default Updates;