import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import FormProgressBar from "../../components/FormProgressBar/FormProgressBar";
import PrimaryErrorMessage from "../../components/PrimaryErrorMessage/PrimaryErrorMessage";
import FormItemCheckbox from "./FormItemCheckbox";
import Investment from './investment.svg'
import Campaign from './campaign.svg'
import { Link } from "react-router-dom";
import TextModal from "../../components/Modal/TextModal";
import ConfigData from "../../config"

// For redux
import { useDispatch, useSelector } from 'react-redux'
import { signedUp, getIsLoggedIn } from '../../store/auth'


function StartupRegistration(){
    const [isFirstPage, setIsFirstPage] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true)
    const [isRead, setIsRead] = useState({
        first: false,
        second: false,
        third: false
    })
    const [showError, setShowError] = useState(false)

    // Redux useDispatch hook
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(getIsLoggedIn)
    console.log("isLoggedIn:", isLoggedIn)
    
    const { register, formState: { errors }, clearErrors, handleSubmit } = useForm();

    const onSubmit = async (data, e) => {
        console.log(data, e);
        clearErrors()
        
        // console.log(ConfigData.SERVER_URL + '/db/startup')
        const signUp = await fetch(ConfigData.SERVER_URL + '/db/startup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        
        const status = await signUp.status
        if (status === 200) {
            const res = await signUp.json()
            console.log(res)

            const data = { "access_token": res.auth0.access_token, "id": res.startup.id }
            dispatch(signedUp(data))

            setIsFirstPage(!isFirstPage)
        } else {
            const error = await signUp.json()
            console.log("Error", error)

            setShowError(true)
        }
        
        
    }

    function readContent(sequence){
        setIsRead(prevState => ({
            ...prevState,
            [sequence]: !prevState[sequence]
        }))
    }

    function closeModal() {
        function changeSelectedModalState() {
            setShowError(false)
        }
        return changeSelectedModalState;
    }

    useEffect(() => {
        let completedReading = Object.keys(isRead).every(function(k){ return isRead[k] === true })

        if (completedReading) {
            setIsDisabled(false)
        }},[isRead]
    )

    return (
        <div>
            {isFirstPage ?
                <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
                    <div className="text-6xl font-Rubik">
                        <p>Startups</p>
                    </div>
                    <br/>
                    <br/>
                    <div className="text-xl font-Rubik text-gray-500 ">
                        <p>Please provide the following info</p>
                    </div>
                    <br/>
                    <div className="bg-white px-24 py-16 rounded-xl space-y-10 shadow-lg h-full w-full flex flex-col items-center sm:w-2/3 lg:w-1/2">
                        <form className="flex flex-col items-center justify-start" onSubmit={handleSubmit(onSubmit)}>
                            <PrimaryInput placeholder="Company Name" register={register("companyName", {required:true})}
                                          properties="text-center" />
                            <PrimaryInput placeholder="Email Address" register={register("emailAddress", {required:true})}
                                          properties="text-center" />
                            <PrimaryInput placeholder="Password" register={register("password", {required :true})}
                                          properties="text-center" />

                            <TextModal header="Error" showModal={showError} setShowModal={closeModal()} 
                                content="There was an issue with registration. Perhaps try a stronger password."
                                />

                            {Object.keys(errors).length > 0 && <PrimaryErrorMessage text="All Fields are required" />}
                            <br />
                            <PrimaryButton text="Sign Up" type="submit" />
                            <br />
                            <br />
                            <FormProgressBar pages={2} selected={0}/>
                        </form>
                    </div>
                    <br/>
                </div>
                :
                <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
                    <div className="text-6xl font-Rubik text-center">
                        <p>Further Action</p>
                    </div>
                    <br/>
                    <br/>
                    <div className="text-xl font-Rubik text-gray-500 text-center">
                        <p>Before you start raising capital, you must understand the basics of equity crowdfunding process.</p>
                    </div>
                    <br/>
                    <div className="bg-white px-20 py-16 rounded-xl space-y-10 shadow-lg h-full w-full sm:w-2/3 lg:w-1/2">
                        <div className="flex flex-col items-end w-full">
                            <br />
                            <FormItemCheckbox buttonText="Investment Guide" onClickFunc={() => readContent("first")}
                                              checkBoxAlt="Read this document" modalImg={Investment} checked={isRead.first}/>
                            <br />
                            <FormItemCheckbox buttonText="Campaign Process Guide" onClickFunc={() => readContent("second")}
                                              checkBoxAlt="Read this document" modalImg={Campaign} checked={isRead.second}/>
                            <br />
                            <FormItemCheckbox buttonText="Terms and Conditions" onClickFunc={() => readContent("third")}
                                              checkBoxAlt="Read this document" checked={isRead.third}/>
                            <br />
                            <br />
                            <Link to="/startup/setup" className="self-center">
                                <PrimaryButton text="Submit" disabled={isDisabled} />
                            </Link>
                            <br />
                            <br />
                            <FormProgressBar pages={2} selected={1}/>
                        </div>
                    </div>
                    <br/>
                </div>
            }
        </div>
    )
}

export default StartupRegistration;