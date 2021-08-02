import React from "react";
import Zilliqa from '../icons/Zilliqa.svg'
import XSGD from '../icons/XSGD.svg'
import Equitize from '../icons/Equitize.svg'

function SetupGuide(){

    return (
        <div className="flex flex-col w-full p-4 lg:p-8 space-y-8">
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Set up your ZilPay Account</p>
                <div className="flex flex-row space-x-6">
                    <img src={Zilliqa} alt="Zilliqa Logo" className="w-16 md:w-24" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Our platform utilises Blockchain to <b>enhance the security and transparency</b> of our transactions. We utilize <b>Zilliqa’s Blockchain technology</b> to convert your investments into unique security tokens stored in smart contracts, which will be explained in the next step. In order to get started, you will need to create a ZilPay account here.</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Deposit your cash in XSGD</p>
                <div className="flex flex-row space-x-6">
                    <img src={XSGD} alt="XSGD Logo" className="w-16 md:w-24" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Before we convert your investments into security tokens, you will have to <b>convert your cash into XSGD</b>. Once converted, XSGD will be used to convert your investments into security tokens stored in smart contracts with a <b>unique address</b> to the startup you are investing in.</p>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-left font-Inter text-xl font-bold">Register your Account with us</p>
                <div className="flex flex-row space-x-6">
                    <img src={Equitize} alt="Equitize Logo" className="w-16 md:w-24" />
                    <p className="font-Inter text-sm sm:text-base md:text-lg text-justify">Once you have set up your ZilPay Wallet, its time to <b>register an account</b> with us. Make use of our platform’s powerful <b>recommendation engine</b> that will <b>recommend</b> the startups <b>based on your interests</b> and risk profile so that you only invest in the best! To start investing, create your account here.</p>
                </div>
            </div>
        </div>
    )
}

export default SetupGuide;