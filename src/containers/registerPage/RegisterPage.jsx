import React from 'react';
import StartupIcon from './startups.svg'
import InvestorsIcon from './investors.svg'
import SignUp from './signup.svg'
import { Link } from "react-router-dom";
import SignUp2 from './signup2.svg'


function RegisterPage(){
    return(
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <div className="text-6xl font-Rubik">
                <p>Sign Up As:</p>
            </div>
            <br/>
            <div className="inline-flex mx-6 space-x-40 my-6">
                <div className="w-1/2 ">
                    <div className="flex flex-col bg-white px-8 py-10 rounded-xl space-y-10 items-center shadow-lg h-full">
                        <img src={StartupIcon} alt="Startup Icon" />
                        <p className="text-center text-2xl font-Rubik">Startups</p>
                        <p className="text-center text-gray-500">Founders who are looking to raise funds for your startup</p>
                        <Link to="/register/startup">
                            <img src={SignUp} alt="Register as Startup" />
                        </Link>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex flex-col bg-white px-8 py-10 rounded-xl space-y-10 items-center shadow-lg bg-secondary text-white h-full">
                        <img src={InvestorsIcon} alt="Retail Investors Icon" />
                        <p className="text-center text-2xl font-Rubik">Retail Investors</p>
                        <p className="text-center ">Public Investors who are seeking to invest in startups</p>
                        <Link to="/register/investor">
                            <img src={SignUp2} alt="Register as Retail Investor" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;