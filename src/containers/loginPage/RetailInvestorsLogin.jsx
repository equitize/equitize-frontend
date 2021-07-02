import React from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import PrimaryErrorMessage from "../../components/PrimaryErrorMessage/PrimaryErrorMessage";

// For redux
import {useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/auth'

function RetailInvestorsLogin(){


    // Redux useDispatch hook
    // const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn)
    console.log("isLoggedIn:", isLoggedIn)
    
    const { register, formState: { errors }, clearErrors, handleSubmit } = useForm();

    const onSubmit = async (data, e) => {
        console.log(data, e);
        console.log("LOGGING IN!")
        clearErrors()
        
        //TODO: Hardcoded URL
        // const signUp = await fetch('http://localhost:8080/api/db/startup', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     method: 'POST',
        //     body: JSON.stringify(data)
        // })
        
        // const status = await signUp.status
        // if (status === 200) {
        //     const res = await signUp.json()
        //     console.log(res)

        //     dispatch(signedUp())

        //     setIsFirstPage(!isFirstPage)
        // } else {
        //     const error = await signUp.json()
        //     console.log("Error", error)
        // }
        
        
    }

    return (
        <>
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
                        <PrimaryInput placeholder="Password" register={register("userPassword", {required :true})}
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