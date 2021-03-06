import React from "react";
import PropTypes from 'prop-types';
import ellipsePrimary from './ellipsePrimary.svg'
import ellipseSecondary from './ellipseSecondary.svg'
import line from './line.svg'

function FormProgressBar({ pages, selected }){
    let indents = [];

    for (let i = 0; i < pages; i++) {
        if (i === 0){
            indents.push(<img src={ellipseSecondary} alt="Inactive Page" key={i} className="w-6 md:w-8" />);
        }
        else{
            indents.push(<img src={line} alt="Connecting Line" key={i} className="w-6 md:w-8" />);
            indents.push(<img src={ellipseSecondary} alt="Inactive Page" key={i+100} className="w-6 md:w-8" />);
        }
    }

    indents[selected*2] = <img src={ellipsePrimary} alt="Active Page" key={selected*2} className="w-6 md:w-8" />

    return (
        <div className="flex flex-wrap self-center">
            {indents}
        </div>
    )
}

FormProgressBar.propTypes = {
    pages: PropTypes.number.isRequired,
    selected: PropTypes.number.isRequired
}

export default FormProgressBar;