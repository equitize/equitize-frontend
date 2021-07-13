import React, { useState } from "react";
import UseComponentVisible from "../../components/UseComponentVisible/UseComponentVisiable";
import { AiOutlinePlusSquare } from "react-icons/ai";
import PropTypes from 'prop-types';

function IndustrySearchBarDropdown({ options, addInterestedIndustriesFunc }) {
    const { ref, isComponentVisible, setIsComponentVisible } = UseComponentVisible(false)
    const [ filteredData, setFilteredData ] = useState(options)

    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = options.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase())
        })
        setFilteredData(newFilter)
    }

    function addIndustry(selectedIndustry) {
        console.log(selectedIndustry)
        addInterestedIndustriesFunc(selectedIndustry)
    }

    return(
        <div className="mt-1 rounded-xl bg-gray-100 placeholder-gray-400 px-2 py-2 xl:text-xl mb-4 mx-4 font-Inter text-xs sm:text-base">
            <div className="relative self-end">
                <div className="absolute xl:top-3.5 lg:top-3 md:top-3 sm:top-2 top-2 right-4">
                    <svg className="h-4 text-dark" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52.966 52.966">
                        <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
                        c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
                        C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
                        S32.459,40,21.983,40z"/>
                    </svg>
                </div>
                <input onClick={() => setIsComponentVisible(true)} onChange={handleFilter} type="search" className="bg-gray-100 placeholder-gray-400 px-2 py-2 xl:text-xl font-Inter text-xs sm:text-base" placeholder="Search..." />
            </div>
            {isComponentVisible && (
                <div ref={ref} className="absolute bg-gray-100 sm:w-1/4 lg:w-1/5 h-auto max-h-48 overflow-hidden overflow-y-auto">
                    {
                        filteredData.map((option) => {
                            return (
                                <div key={option.id} className="flex w-full justify-between m-1 px-2 rounded-md items-center">
                                    <p>{option.name}</p>
                                    <AiOutlinePlusSquare
                                        onClick={() => addIndustry(option)}
                                        className='fill-current text-black cursor-pointer text-base mx-1 h-4 w-4'
                                        />
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}

IndustrySearchBarDropdown.propTypes = {
    options: PropTypes.array,
    addInterestedIndustriesFunc: PropTypes.func
}

export default IndustrySearchBarDropdown