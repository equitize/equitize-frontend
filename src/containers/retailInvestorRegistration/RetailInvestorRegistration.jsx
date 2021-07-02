import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import FormProgressBar from "../../components/FormProgressBar/FormProgressBar";
import PrimaryErrorMessage from "../../components/PrimaryErrorMessage/PrimaryErrorMessage";
import FormItemCheckbox from "../startupRegistration/FormItemCheckbox";
import Investment from '../startupRegistration/investment.svg'
import Campaign from '../startupRegistration/campaign.svg'
import { Link } from "react-router-dom";
import InterestedIndustries from './InterestedIndustries'
import allCategories from './allCategories'
import IndustrySearchBarDropdown from "./IndustrySearchBarDropdown";

// For redux
import { useDispatch, useSelector } from 'react-redux'
import { signedUp, getIsLoggedIn } from '../../store/auth'

function RetailInvestorRegistration(){
    const [page, setPage] = useState("first")
    const [isDisabled, setIsDisabled] = useState(true)
    const [isRead, setIsRead] = useState({
        first: false,
        second: false,
        third: false
    })
    const [age, setAge] = useState(21)
    const [ interestedIndustries, setInterestedIndustries ] = useState([])
    const [ finalForm, setFinalForm ] = useState({})

    // Redux useDispatch hook
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn)
    console.log("isLoggedIn:", isLoggedIn)
    
    const { register, formState: { errors }, clearErrors, handleSubmit } = useForm();
    
    const preferencesForm = useForm()
    const registerPreferences = preferencesForm.register
    const handleSubmitPreferences = preferencesForm.handleSubmit

    const onSubmitUserDetails = (data, e) => {
        console.log(data, e);
        clearErrors()

        function addToRegistrationForm(form) {
            setFinalForm(form)
            setPage("second")
        }

        return addToRegistrationForm(data)
        
    }

    const onSubmitUserPreferences = async (data) => {
        const { age, gender } = data
        console.log(finalForm)
        const industryPreferences = interestedIndustries

        const allPrefs = {industryPreferences, age, gender, ...finalForm}
        console.log(allPrefs)

        //TODO: Hardcoded URL
        const signUp = await fetch('http://localhost:8080/api/db/retailInvestors/', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(allPrefs)
        })
        
        const status = signUp.status
        if (status === 200) {
            const res = await signUp.json()
            console.log(res)

            dispatch(signedUp())

            setPage("third")
        } else {
            const error = await signUp.json()
            console.log("Error", error)
        }

    }

    function addInterestedIndustriesFunc(industry) {
        function addSelectedMilestone(selected) {
            if (!handleCheck(selected)) {
                const newList = [selected, ...interestedIndustries]
                setInterestedIndustries(newList)
            }
        }
        
        return addSelectedMilestone(industry)
    }

    function handleCheck(item) {
        return interestedIndustries.some(industry => item.id === industry.id)
    }

    function removeInterestedIndustry(id) {
        function remove(selected) {
            const removedArr = [...interestedIndustries].filter(industry => industry.id !== selected)
            setInterestedIndustries(removedArr)
        }

        return remove(id)
    }

    function readContent(sequence){
        setIsRead(prevState => ({
            ...prevState,
            [sequence]: !prevState[sequence]
        }))
    }

    useEffect(() => {
        let completedReading = Object.keys(isRead).every(function(k){ return isRead[k] === true })

        if (completedReading) {
            setIsDisabled(false)
        }},[isRead]
    )

    function onAgeChange(data) {
        setAge(data)
    }

    return (
        <div>
            {page === "first" &&
                <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
                    <div className="text-6xl font-Rubik">
                        <p>Retail Investors</p>
                    </div>
                    <br/>
                    <br/>
                    <div className="text-xl font-Rubik text-gray-500 ">
                        <p>Please provide the following info</p>
                    </div>
                    <br/>
                    <div className="bg-white px-24 py-16 rounded-xl space-y-10 shadow-lg h-full w-full flex flex-col items-center sm:w-2/3 lg:w-1/2">
                        <form className="flex flex-col items-center justify-start" onSubmit={handleSubmit(onSubmitUserDetails)}>
                            <PrimaryInput placeholder="First Name" register={register("firstName", {required:true})}
                                          properties="text-center" />
                            <PrimaryInput placeholder="Last Name" register={register("lastName", {required:true})}
                                          properties="text-center" />
                            <PrimaryInput placeholder="Email Address" register={register("emailAddress", {required:true})}
                                          properties="text-center" />
                            <PrimaryInput placeholder="Password" register={register("userPassword", {required :true})}
                                          properties="text-center" />

                            {Object.keys(errors).length > 0 && <PrimaryErrorMessage text="All Fields are required" />}
                            <br />
                            <PrimaryButton text="Sign Up" type="submit" />
                            <br />
                            <br />
                            <FormProgressBar pages={3} selected={0}/>
                        </form>
                    </div>
                    <br/>
                </div>
                }

                {page === "second" && 
                    <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
                        <div className="text-6xl font-Rubik text-center">
                        <p>Further Action</p>
                    </div>
                    <br/>
                    <br/>
                    <div className="text-xl font-Rubik text-gray-500 text-center">
                        <p>Tell us more about yourself so that our recommender system can recommend you relevant startups.</p>
                    </div>
                    <div className="bg-white px-24 py-16 rounded-xl space-y-10 shadow-lg h-full w-full flex flex-col items-center sm:w-2/3 lg:w-1/2 ">
                        <form className="flex flex-col justify-start max-w-min" onSubmit={handleSubmitPreferences(onSubmitUserPreferences)}>
                            <label className="block text-sm font-medium text-gray-700 px-5">Age</label>
                            <PrimaryInput className="rounded-xl bg-gray-100 placeholder-gray-400 px-2 py-2 xl:text-xl mb-4 mx-4 mt-1 font-Inter text-center text-xs sm:text-base"
                                        value={age} min="21" max="100" onChange={e => onAgeChange(e.target.value)} type="number" register={registerPreferences("age")} />

                            <label className="block text-sm font-medium text-gray-700 px-5">Gender</label>
                            <select name="gender" className="rounded-xl bg-gray-100 placeholder-gray-400 px-2 py-2 xl:text-xl mb-4 mx-4 mt-1 font-Inter text-center text-xs sm:text-base" 
                                        id="gender" {...registerPreferences("gender")}>
                                <option value="">Please select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <label className="block text-sm font-medium text-gray-700 px-5">Interested industries</label>
                            <IndustrySearchBarDropdown options={allCategories} addInterestedIndustriesFunc={addInterestedIndustriesFunc} />
                            <div className="items-stretch px-4 xl:text-xl mb-4 font-Inter text-xs sm:text-base w-100 overflow-auto">
                                <InterestedIndustries industries={interestedIndustries} removeInterestedIndustry={removeInterestedIndustry} />
                            </div>
                            <br />
                            <div className="inline-flex justify-between px-4">
                                {/* TODO: onClick handle Skip */}
                                <PrimaryButton text="Skip" />
                                <PrimaryButton text="Next" type="submit" />
                            </div>
                            
                            <br />
                            <br />
                            <FormProgressBar pages={3} selected={1}/>
                        </form>
                    </div>
                    <br/>
                    </div>
                }

                {page === "third" && 
                    <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
                        <div className="text-6xl font-Rubik text-center">
                            <p>Further Action</p>
                        </div>
                        <br/>
                        <br/>
                        <div className="text-xl font-Rubik text-gray-500 text-center">
                            <p>Before you start investing, you must understand how our platform works and the risks of equity investment.</p>
                        </div>
                        <br/>
                        <div className="bg-white px-20 py-16 rounded-xl space-y-10 shadow-lg h-full w-full sm:w-2/3 lg:w-1/2">
                            <div className="flex flex-col items-end w-full">
                                <br />
                                <FormItemCheckbox buttonText="Investment Guide" onClickFunc={() => readContent("first")}
                                                checkBoxAlt="Read this document" modalImg={Investment} checked={isRead.first}/>
                                <br />
                                <FormItemCheckbox buttonText="Risk Disclosure" onClickFunc={() => readContent("second")}
                                                checkBoxAlt="Read this document" modalImg={Campaign} checked={isRead.second}/>
                                <br />
                                <FormItemCheckbox buttonText="Terms and Conditions" onClickFunc={() => readContent("third")}
                                                checkBoxAlt="Read this document" checked={isRead.third}/>
                                <br />
                                <br />
                                <Link to="/home" className="self-center">
                                    <PrimaryButton text="Submit" disabled={isDisabled} />
                                </Link>
                                <br />
                                <br />
                                <FormProgressBar pages={3} selected={2}/>
                            </div>
                        </div>
                        <br/>
                    </div>
                }
                
        </div>
    )
}

export default RetailInvestorRegistration;