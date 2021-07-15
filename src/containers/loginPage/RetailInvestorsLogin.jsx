import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import PrimaryErrorMessage from "../../components/PrimaryErrorMessage/PrimaryErrorMessage";
import ConfigData from "../../config";
import TextModal from "../../components/Modal/TextModal";
// import { useHistory } from "react-router-dom";

// For redux
import {useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/auth'

function RetailInvestorsLogin(){
    // const history = useHistory()

    // Redux useDispatch hook
    // const dispatch = useDispatch()
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
            "username": data.emailAddress,
            "password": data.password,
            "grant_type": "http://auth0.com/oauth/grant-type/password-realm",
            "client_id": "rnJseEODgHtBwSezZuzc0nsoATkhRTeX",
            "audience": "BackendAPI",
            "realm": "Username-Password-Authentication"
        }

        const logIn = await fetch(ConfigData.AUTH_URL + "/oauth/token", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(logInCred)
        })
        
        const status = await logIn.status
        if (status === 200) {
            const res = await logIn.json()
            console.log(res)

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
                    <p>Retail Investor Login</p>
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
                        <PrimaryInput placeholder="Password" register={register("password", {required :true})}
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

export default RetailInvestorsLogin;