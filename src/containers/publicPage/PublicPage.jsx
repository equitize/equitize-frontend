import React from 'react';
import SamplePicture from './Illustration.svg';

function PublicPage() {

    return (
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
            <div className="flex-col items-center md:w-1/2">
                <p className="text-left lg:text-8xl md:text-7xl sm:text-5xl text-5xl font-Rubik">Empowering StartUps and Retail Investors</p>
                <br/>
                <p className="text-gray-600 font-Rubik">Let us help you</p>
            </div>
            <img src={SamplePicture} alt="Display Picture" />
        </div>
    )

}


export default PublicPage;