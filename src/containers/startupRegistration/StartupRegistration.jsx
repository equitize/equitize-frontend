import React, {useEffect, useState} from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import FormProgressBar from "../../components/FormProgressBar/FormProgressBar";
import PrimaryErrorMessage from "../../components/PrimaryErrorMessage/PrimaryErrorMessage";
import FormButton from "../../components/FormButton/FormButton";
import checkBoxGrayIcon from './checkBoxGray.svg'

function StartupRegistration (){
    const [isFirstPage, setIsFirstPage] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true)
    const [isRead, setIsRead] = useState({
        first: false,
        second: false,
        third: false
    })

    const { register, formState: { errors }, clearErrors, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        console.log(data, e);
        clearErrors()
        setIsFirstPage(!isFirstPage)
    }

    function readContent(e, sequence){
        e.preventDefault()
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
                    <div className="bg-white px-24 py-16 rounded-xl space-y-10 shadow-lg h-full flex flex-col items-center">
                        <form className="flex flex-col items-center justify-start" onSubmit={handleSubmit(onSubmit)}>
                            <PrimaryInput placeholder="Company Name" register={register("companyName", {required:true})} />
                            <PrimaryInput placeholder="Email Address" register={register("emailAddress", {required:true})} />
                            <PrimaryInput placeholder="Password" register={register("password", {required :true})} />

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
                    <div className="bg-white px-20 py-16 rounded-xl space-y-10 shadow-lg h-full w-1/2">
                        <div className="flex flex-col items-end w-full">
                            <br />
                            <div className="flex flex-wrap space-x-0 md:space-x-10 w-full justify-end">
                                <FormButton text="Investment Guide" onClick={e => readContent(e,"first")}/>
                                <img src={checkBoxGrayIcon} alt="Read this document" />
                            </div>
                            <br />
                            <div className="flex flex-wrap space-x-10 w-full justify-end">
                                <FormButton text="Campaign Process Guide" onClick={e => readContent(e,"second")}/>
                                <img src={checkBoxGrayIcon} alt="Read this document" />
                            </div>
                            <br />
                            <div className="flex flex-wrap space-x-10 w-full justify-end">
                                <FormButton text="Terms and Conditions" onClick={e => readContent(e,"third")}/>
                                <img src={checkBoxGrayIcon} alt="Read this document" />
                            </div>
                            <br />
                            <br />
                            <PrimaryButton text="Submit" disabled={isDisabled} />
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