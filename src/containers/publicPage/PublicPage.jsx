import React from 'react';
import { Link } from "react-router-dom";
import SamplePicture from './Illustration.svg';
import ChartIcon from './icons/charts.png'
import GlobeIcon from './icons/globe.png'
import PersonIcon from './icons/person.png'
import NumberOne from './icons/numberOne.png'
import NumberTwo from './icons/numberTwo.png'
import NumberThree from './icons/numberThree.png'
import NumberFour from './icons/numberFour.png'
import ThumbsUp from './icons/ThumbsUp.svg'
import Dollar from './icons/Dollar.svg'
import Pin from './icons/Pin.svg'
import Equity from './icons/Equity.svg'
import Users from './icons/Users.png'
import TrendingUp from './icons/TrendingUp.svg'
import Hub from './icons/Hub.svg'
import UserCircle from './icons/UserCircle.svg'
import CheckList from './icons/CheckList.svg'
import Work from './icons/Work.svg'
import Stars from './icons/Stars.svg'
import People from './icons/People.svg'

function PublicPage() {

    return (
        <div className="flex flex-col items-center justify-between w-full">
            <div className="flex sm:flex-row flex-col w-3/4 p-4 sm:p-6">
                <div className="flex flex-col items-center md:w-1/2 px-4 place-content-center">
                    <p className="text-left xl:text-7xl lg:text-6xl sm:text-5xl text-4xl font-Rubik">Blockchain Powered Equity Crowdfunding</p>
                    <br/>
                    <div className="self-start">
                        <p className="text-left text-gray-400 font-Rubik sm:text-2xl">We empower startups so that our investors become highly successful</p>
                    </div>
                    <br/>
                    <Link className="self-start" to="/guide">
                        <button className="bg-custom-blue text-white font-bold py-2 px-5 rounded-full">Learn More</button>
                    </Link>
                </div>
                <div className="flex flex-row w-full sm:w-1/2 justify-center">
                    <img src={SamplePicture} alt="Display Picture" />
                </div>
            </div>
            <div className="flex flex-col bg-secondary w-full items-center space-y-12 px-4 py-6">
                <br/>
                <div className="flex flex-col bg-secondary w-3/4 items-center space-y-16">
                    <p className="text-white font-Rubik text-xl md:text-3xl lg:text-4xl">Equitize at a glance</p>
                    <div className="flex flex-col lg:flex-row w-full items-center space-y-8 lg:space-y-0 lg:px-8">
                        <div className="flex flex-row w-full md:w-1/3 justify-center items-center space-x-4">
                            <div className="flex flex-col w-16">
                                <img src={ChartIcon} alt="Chart Icon" />
                            </div>
                            <div className="flex flex-col text-white space-y-4 w-48 md:w-2/3 ">
                                <p className="font-Rubik text-2xl md:text-4xl">$30B</p>
                                <p className="font-Inter text-xs md:text-sm lg:text-base">Digital Currency Exchanged</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full md:w-1/3 justify-center items-center space-x-4">
                            <div className="flex flex-col w-16">
                                <img src={PersonIcon} alt="Globe Icon" />
                            </div>
                            <div className="flex flex-col text-white space-y-4 w-48 md:w-2/3 ">
                                <p className="font-Rubik text-2xl md:text-4xl">1000+</p>
                                <p className="font-Inter text-xs md:text-sm lg:text-base">Successful Campaigns launched</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full md:w-1/3 justify-center items-center space-x-4">
                            <div className="flex flex-col w-16">
                                <img src={GlobeIcon} alt="Person Icon"  />
                            </div>
                            <div className="flex flex-col text-white space-y-4 w-48 md:w-2/3 ">
                                <p className="font-Rubik text-2xl md:text-4xl">195</p>
                                <p className="font-Inter text-xs md:text-sm lg:text-base">Countries Supported</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap text-white w-full px-4 gap-y-5">
                        <div className="flex flex-col md:w-1/2 lg:w-1/4 space-y-3 px-8" >
                            <div className="flex flex-row w-full justify-center">
                                <img src={NumberOne} alt="Number 1" />
                                <p className="font-Rubik text-xl text-center w-56">Highly vetted and mentored startups</p>
                            </div>
                            <div className="flex flex-row justify-center">
                                <img src={ThumbsUp} alt="Thumbs Up Icon" className="w-20" />
                            </div>
                            <div className="flex flex-row self-center px-2">
                                <p className="text-justify font-Inter text-sm md:text-base">Select from a range of highly vetted startups, where these startups are specially guided by commercial champions to exponentially improve their odds of success so that you will invest in the best.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/2 lg:w-1/4 space-y-3 px-8">
                            <div className="flex flex-row w-full justify-center">
                                <img src={NumberTwo} alt="Number 2" />
                                <p className="font-Rubik text-xl text-center w-56">Conversion into Security Tokens</p>
                            </div>
                            <div className="flex flex-row justify-center">
                                <img src={Dollar} alt="Dollar Icon" className="w-20" />
                            </div>
                            <div className="flex flex-row self-center px-2">
                                <p className="text-justify font-Inter text-sm md:text-base">Your initial investment will be converted to security tokens and stored safely in smart contracts using our blockchain technology. If the campaign fails, 100% of your investments will be returned to you.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/2 lg:w-1/4 space-y-3 px-8">
                            <div className="flex flex-row w-full justify-center">
                                <img src={NumberThree} alt="Number 3" />
                                <p className="font-Rubik text-xl text-center w-56">Ownership in startup equity</p>
                            </div>
                            <div className="flex flex-row justify-center">
                                <img src={Equity} alt="Equity Icon" className="w-20" />
                            </div>
                            <div className="flex flex-row self-center px-2">
                                <p className="text-justify font-Inter text-sm md:text-base">If the campaign is successful, you will be a proud equity stake holder of the company with your security tokens.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/2 lg:w-1/4 space-y-3 px-8">
                            <div className="flex flex-row w-full justify-center">
                                <img src={NumberFour} alt="Number 4" />
                                <p className="font-Rubik text-xl text-center w-56 self-center lg:self-auto">Milestone System</p>
                            </div>
                            <div className="flex flex-row justify-center">
                                <img src={Pin} alt="Pin Icon" className="w-20" />
                            </div>
                            <div className="flex flex-row self-center px-2">
                                <p className="text-justify font-Inter text-sm md:text-base">Upon a successful crowdfunding campaign, startups will have to complete a series of milestones that they set for themselves, with each milestone unlocking a percentage of funds. If the startups defaults through one of the milestones, investors will get back the remaining investment.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex flex-col bg-primary w-full items-center space-y-10 px-4">
                <div className="flex flex-col w-full items-center space-y-12 sm:p-4">
                    <br/>
                    <div className="flex flex-col w-3/4 items-center space-y-16">
                        <p className="text-white font-Rubik text-xl md:text-3xl lg:text-4xl">Are you a Retail Investor?</p>
                        <p className="text-white font-Rubik text-base lg:text-xl w-1/2 text-center">Ever wanted to have an early stake in the next BIG startup but NEVER had the opportunity to do so? Now you can!</p>
                        <div className="flex flex-col lg:flex-row w-full px-8 text-white space-y-5">
                            <div className="flex flex-row w-full lg:w-1/3 justify-center">
                                <img src={Users} alt="Users" className="h-1/3 lg:h-5/6" />
                            </div>
                            <div className="flex flex-col lg:w-2/3 space-y-6">
                                <div className="flex flex-col md:flex-row w-full md:space-x-6 gap-y-5">
                                    <div className="flex flex-col w-full md:w-1/2 space-y-3 md:items-baseline items-center">
                                        <p className="font-Inter text-xl font-bold">Little Capital Requirement</p>
                                        <div className="flex flex-row w-2/3 md:w-full space-x-4">
                                            <div className="flex flex-row w-1/2 lg:w-14 items-center md:items-start">
                                                <img src={TrendingUp} alt="Trending Up Icon" className="w-full h-12 md:h-full" />
                                            </div>
                                            <p className="font-Inter text-base text-justify">Start investing a small stake in startups with as little as $1000!</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full md:w-1/2 space-y-3 md:items-baseline items-center">
                                        <p className="font-Inter text-xl font-bold">Blockchain Powered</p>
                                        <div className="flex flex-row w-2/3 md:w-full space-x-4">
                                            <div className="flex flex-row w-1/2 lg:w-24 items-center md:items-start">
                                                <img src={Hub} alt="Hub Icon" className="w-full h-2/3" />
                                            </div>
                                            <p className="font-Inter text-base text-justify">Unprecedented levels of transparency and protection for our investors compared to other forms of crowdfunding</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row w-full md:space-x-6 gap-y-5">
                                    <div className="flex flex-col w-full md:w-1/2 space-y-3 md:items-baseline items-center">
                                        <p className="font-Inter text-xl font-bold">Invest in the best</p>
                                        <div className="flex flex-row w-2/3 md:w-full space-x-4">
                                            <div className="flex flex-row w-1/2 lg:w-24 items-center md:items-start">
                                                <img src={UserCircle} alt="User Circle Icon" className="w-20 md:w-full h-12 md:h-full" />
                                            </div>
                                            <p className="font-Inter text-base text-justify">Stringent startup onboarding selection process and a structured mentorship to ensure their and your success!</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full md:w-1/2 space-y-3 md:items-baseline items-center">
                                        <p className="font-Inter text-xl font-bold">Recommender System</p>
                                        <div className="flex flex-row w-2/3 md:w-full sm:space-x-4">
                                            <div className="flex flex-row w-1/2 lg:w-24 justify-center items-center md:items-start">
                                                <img src={CheckList} alt="Checklist Icon" className=" md:w-full h-8 md:h-full" />
                                            </div>
                                            <p className="font-Inter text-base text-justify">Choose from a curated list of startups based on your interests with our recommender system</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full items-center space-y-12 sm:p-4">
                    <div className="flex flex-col w-3/4 items-center space-y-16">
                        <p className="text-white font-Rubik text-xl md:text-3xl lg:text-4xl">Are you a Startup?</p>
                        <p className="text-white font-Rubik text-base lg:text-xl w-1/2 text-center">Ever wanted to start a kickass campaign, but struggle to find accredited investors and guided mentorship? We can help you soar!</p>
                        <div className="flex flex-col lg:flex-row w-full px-8 text-white space-y-5">
                            <div className="flex flex-row w-full lg:w-1/3 justify-center">
                                <img src={Work} alt="Users" className="h-1/3 lg:h-5/6" />
                            </div>
                            <div className="flex flex-col lg:w-2/3 space-y-6">
                                <div className="flex flex-col md:flex-row w-full md:space-x-6 gap-y-5">
                                    <div className="flex flex-col w-full md:w-1/2 space-y-3 md:items-baseline items-center">
                                        <p className="font-Inter text-xl font-bold">Access to Retail Investors</p>
                                        <div className="flex flex-row w-2/3 md:w-full space-x-4">
                                            <div className="flex flex-row w-1/2 lg:w-24 items-center md:items-start">
                                                <img src={People} alt="People Icon" className="w-full h-24 md:h-full" />
                                            </div>
                                            <p className="font-Inter text-base text-justify">We give startups a platform to voice their vision and crowdfund from the community that share the same ideals</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full md:w-1/2 space-y-3 md:items-baseline items-center">
                                        <p className="font-Inter text-xl font-bold">Guided Mentorship</p>
                                        <div className="flex flex-row w-2/3 md:w-full space-x-4">
                                            <div className="flex flex-row w-1/2 lg:w-24 items-center md:items-start">
                                                <img src={Stars} alt="Stars Icon" className="w-full h-24 md:h-full" />
                                            </div>
                                            <p className="font-Inter text-base text-justify">We onboard Commercial Champions who are passionate experts in a wide range of industries to guide and push you to achieve your success</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link className="self-center px-10" to="/register">
                    <button className="bg-custom-blue text-white font-bold py-2 px-5 rounded-full">
                        Sign up Now
                    </button>
                </Link>
            </div>
        </div>
    )

}


export default PublicPage;
