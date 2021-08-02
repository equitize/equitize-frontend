import React from 'react';
import PageNotFound from './404.svg'
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useHistory } from "react-router-dom";

function InvalidPage() {
    let history = useHistory()

    return (
        <div className="container flex flex-col px-5 py-12 md:py-16 mx-auto items-center">
            <img src={PageNotFound} alt="Page Not Found Image" />
            <PrimaryButton text="Return Home" onClick={() => { history.push("/")}} />
        </div>
    );
}

export default InvalidPage;