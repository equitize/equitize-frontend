import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import PrimaryErrorMessage from "../../components/PrimaryErrorMessage/PrimaryErrorMessage";
import ConfigData from "../../config";
import TextModal from "../../components/Modal/TextModal";
import { useHistory } from "react-router-dom";

// For redux
import {useSelector, useDispatch } from 'react-redux'
import { getIsLoggedIn, loggedIn } from '../../store/auth'

function StartupsLogin(){
    const history = useHistory()

    // Redux useDispatch hook
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn)
    console.log("isLoggedIn:", isLoggedIn)
    
    const { register, formState: { errors }, clearErrors, handleSubmit } = useForm();
    const [showError, setShowError] = useState(false)
    const [resError, setResError] = useState("")

    const onSubmit = async (data, e) => {
        console.log(data, e);
        console.log("LOGGING IN!")
        clearErrors()

        const logInCred = {
            "emailAddress": data.emailAddress,
            "password": data.companyPassword,
        }

        const logIn = await fetch(ConfigData.SERVER_URL + "/db/startup/login", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(logInCred)
        })
        
        const status = await logIn.status
        if (status === 200) {
            const res = await logIn.json()
            const ID = res.startupID.id
            const accessToken = res.auth0.access_token

            const reduxPayload = { "access_token": accessToken, "id": ID }
            dispatch(loggedIn(reduxPayload))

            const URL = `/startup/setup`
            history.push(URL)

        } else {
            const error = await logIn.json()
            console.log("Error", error)
            setShowError(true)
            setResError("Error " + error.error + ": " + error.error_description)
        }
    }

    function closeModal() {
        function changeSelectedModalState() {
            setShowError(false)
        }
        return changeSelectedModalState;
    }

    return (
        <>
            <TextModal header="Error" showModal={showError} setShowModal={closeModal()} 
                                content={resError}
                                />
            <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
                <div className="text-6xl font-Rubik">
                    <p>Startup Login</p>
                </div>
                <br/>
                <br/>
                <div className="text-xl font-Rubik text-gray-500 ">
                    <p>Please enter your login details</p>
                </div>
                <br/>
                <div className="bg-white px-24 py-16 rounded-xl space-y-10 shadow-lg h-full w-full flex flex-col items-center sm:w-2/3 lg:w-1/2">
                    <form className="flex flex-col items-center justify-start" onSubmit={handleSubmit(onSubmit)}>
                        <PrimaryInput placeholder="Email Address" register={register("emailAddress", {required:true})}
                                        properties="text-center" />
                        <PrimaryInput placeholder="Password" register={register("companyPassword", {required :true})}
                                        properties="text-center" />

                        {Object.keys(errors).length > 0 && <PrimaryErrorMessage text="All Fields are required" />}
                        <br />
                        <PrimaryButton text="Log In" type="submit" />
                        <br />
                        <br />
                    </form>
                </div>
                <br/>
            </div>
        </>
    )
}

export default StartupsLogin;