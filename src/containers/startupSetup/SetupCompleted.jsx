import React from "react";
import SetupCompletedImage from './setupCompleted.svg'
import {Link} from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

function SetupCompleted(){
    return (
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <div className="text-4xl md:text-6xl font-Rubik">
                <p>Congratulations!</p>
            </div>
            <br />
            <br />
            <div className="text-md md:text-xl font-Rubik w-1/2 text-center">
                <p>You have successfully set up your account!</p>
                <br/>
                <p>We will review your application and follow up with you shortly within 3-5 working days via your email!</p>
            </div>
            <img src={SetupCompletedImage} alt="Celebration Image" />
            <br />
            <br />
            <Link to="/">
                <PrimaryButton text="Return to Home" properties="self-end" />
            </Link>
            <br />
        </div>
    )
}

export default SetupCompleted;