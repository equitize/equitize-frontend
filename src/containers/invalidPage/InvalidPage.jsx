import React from 'react';
import { useLocation } from "react-router-dom";

function InvalidPage() {
    let location = useLocation();

    return (
        <div className="container px-5 py-24 mx-auto">
            <h3>
                Invalid Page for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

export default InvalidPage;