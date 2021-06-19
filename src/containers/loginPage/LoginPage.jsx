import React from 'react';
import StartupIcon from "../registerPage/startups.svg";
import { Link } from "react-router-dom";
import SignUp from "../registerPage/signup.svg";
import InvestorsIcon from "../registerPage/investors.svg";
import SignUp2 from "../registerPage/signup2.svg";

function LoginPage(){

    // PUSH API TO CREATE FAKE RI AND ADD INDUSTRIES
    const pushFakeData = async () => {
        const createRI = await fetch('http://localhost:8080/api/db/retailInvestors/', {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ~jwttoken~'
            },
            method: 'POST',
            body: JSON.stringify({
                "firstName" : "asdfasdf",
                "lastName": "aaasdfas@asldfkjsha.xyz",
                "userPassword" : "kajlshdf!aslkdjh@#",
                "emailAddress": "test@gmail.com",
                "singPass": "singpass",
                "incomeStatement": "incomeStatement",
                "incomeTaxReturn": "incomeTaxReturn"
            })
        })

        const createRIRes= await createRI.json()
        console.log(createRIRes)

        const addIndustries = await fetch('http://localhost:8080/api/db/retailInvestors/industries/addIndustries/', {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ~jwttoken~'
            },
            method: 'POST',
            body: JSON.stringify({
                "industryNames": ["Finance", "Tech", "Farming"],
                "id": 1,
                "accountType": "retailInvestor"
            })
        })
        const addIndustriesRes = await addIndustries.json()
        console.log(addIndustriesRes)
    }

    return(
        <div className="container mx-auto flex flex-wrap p-5 flex-col items-center my-auto">
            <p className="text-xl sm:text-4xl lg:text-6xl font-Rubik self-center">Who are you?</p>
            <br/>
            <div className="inline-flex mx-0 sm:space-x-6 md:space-x-20 lg:space-x-40 my-6">
                <div className="w-1/2">
                    <div className="flex flex-col bg-white px-1 sm:px-8 py-4 sm:py-10 rounded-xl space-y-10 items-center shadow-lg h-full">
                        <img src={StartupIcon} alt="Startup Icon" />
                        <p className="text-center text-2xl font-Rubik">Startups</p>
                        <p className="text-center text-gray-500">Founders who are looking to raise funds for your startup</p>
                        <Link to="/">
                            <img src={SignUp} alt="Log in as Startup" />
                        </Link>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex flex-col bg-white px-1 sm:px-8 py-4 sm:py-10 rounded-xl space-y-10 items-center shadow-lg bg-secondary text-white h-full">
                        <img src={InvestorsIcon} alt="Retail Investors Icon" />
                        <p className="text-center text-2xl font-Rubik">Retail Investors</p>
                        <p className="text-center ">Public Investors who are seeking to invest in startups</p>
                        <Link to="/home" onClick={pushFakeData}>
                            <img src={SignUp2} alt="Log in Retail Investor" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginPage;