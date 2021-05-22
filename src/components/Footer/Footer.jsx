import React from 'react';
import Logo from "./Logo.svg";
import MasterCard from "./Mastercard.svg"
import Visa from "./Visa.svg"
import Xfers from "./xfers.svg"

function Footer() {
 return (
     <div className="bg-primary px-5 py-24 mx-auto">
         <div className="flex flex-wrap opacity-100 justify-between">
             <div className="lg:w-1/4 w-1/2">
                 <div className="font-Inter text-white inline-flex items-start">
                     <img src={Logo} alt="Company Logo" className="-my-2"/>
                     <p className="px-2">EQUITIZE</p>
                 </div>
                 <div className="font-Inter text-white flex flex-wrap flex-col lg:px-12 pb-4 lg:pb-0">
                     <div className="pl-12 lg:pl-0">
                         <p className="text-sm my-1">About Us</p>
                         <p className="text-sm my-1">Key Features</p>
                         <p className="text-sm my-1">Investment Guide</p>
                         <p className="text-sm my-1">Campaign Process</p>
                     </div>
                 </div>
             </div>
             <div className="font-Inter text-white flex flex-wrap flex-col lg:w-1/4 w-1/2 xl:items-start">
                 <p className="text-xl">Learn</p>
                 <div className="my-3">
                     <p className="text-sm my-1">Regulations</p>
                     <p className="text-sm my-1">General FAQ</p>
                 </div>
             </div>
             <div className="font-Inter text-white flex flex-wrap flex-col lg:w-1/4 w-1/2 px-12">
                 <p className="text-xl">Contact</p>
                 <div className="my-3">
                     <p className="text-sm my-1">Connect With Us</p>
                     <p className="text-sm my-1">General FAQ</p>
                 </div>
             </div>
             <div className="font-Inter text-white flex flex-wrap flex-col lg:w-1/4 w-1/2 lg:items-center">
                 <p className="text-xl">Payment Services</p>
                 <div className="flex flex-wrap my-3 xl:space-x-4 flex-col xl:flex-row items-start px-9 lg:px-0 lg:items-center">
                         <img src={Visa} alt="Company Logo" className=""/>
                         <img src={MasterCard} alt="Company Logo" className=""/>
                         <img src={Xfers} alt="Company Logo" className=""/>
                 </div>
             </div>
         </div>
     </div>
 )
}

export default Footer;