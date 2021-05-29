import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import InfoIcon from './info.svg'

function PrimaryUploadButton({ text, properties, moreInfo, labelId, moreInfoFunc, errorFunc, Modal }){
    let cssProperties;

    if (moreInfo){
        cssProperties = classNames(properties,
            "flex flex-wrap justify-between bg-gray-100 placeholder-gray-400 hover:bg-gray-300 self-stretch text-center font-bold py-4 px-4 m-1 rounded-xl text-xs sm:text-sm lg:text-xl")
    }
    else{
        cssProperties = classNames(properties,
            "flex flex-wrap bg-gray-100 placeholder-gray-400 hover:bg-gray-300 self-stretch text-center font-bold py-4 px-4 m-1 rounded-xl text-sm lg:text-xl")
    }

    const [file, setFile] = useState({
        "name": ""
    })

    function fileUpload(fileToUpload){
        // TODO API CALL
        console.log(fileToUpload)
        return true
    }

    const fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        if (event.target.files[0] !== undefined){
            let success = fileUpload(event.target.files[0])
            if (success){
                setFile(event.target.files[0])
            }
            else{
                errorFunc("An unexpected error has occurred")
            }
        }
    };

    return(
        <>
            {
                moreInfo ?
                    file.name !== ''?
                        <>
                            <label htmlFor={labelId} className={cssProperties}>
                                <p className="place-self-center">{file.name}</p>
                                <img src={InfoIcon} alt="Click for more information" onClick={(e)=> {
                                    e.preventDefault()
                                    moreInfoFunc(labelId)()
                                }} />
                            </label>
                            <input
                                id={labelId}
                                style={{display:'none'}}
                                type={"file"}
                                onChange={(e) => fileSelectedHandler(e)}
                            />
                            {
                                Modal
                            }
                        </>
                        : <>
                            <label htmlFor={labelId} className={cssProperties}>
                                <p className="place-self-center">{text}</p>
                                <img src={InfoIcon} alt="Click for more information" onClick={(e)=> {
                                    e.preventDefault()
                                    moreInfoFunc(labelId)()
                                }} />
                            </label>
                            <input
                                id={labelId}
                                style={{display:'none'}}
                                type={"file"}
                                onChange={(e) => fileSelectedHandler(e)} />
                            {
                                Modal
                            }
                        </>
                    : file.name !== '' ?
                    <>
                        <label htmlFor={labelId} className={cssProperties}>
                            <p className="place-self-center">{file.name}</p>
                        </label>
                        <input
                            id={labelId}
                            style={{display:'none'}}
                            type={"file"}
                            onChange={(e) => fileSelectedHandler(e)}
                        />
                    </>
                    : <>
                        <label htmlFor={labelId} className={cssProperties}>
                            <p className="place-self-center">{text}</p>
                        </label>
                        <input
                            id={labelId}
                            style={{display:'none'}}
                            type={"file"}
                            onChange={(e) => fileSelectedHandler(e)} />
                    </>
            }
        </>
    )
}

PrimaryUploadButton.propTypes = {
    text: PropTypes.string.isRequired,
    properties: PropTypes.any,
    moreInfo: PropTypes.bool,
    labelId: PropTypes.string,
    moreInfoFunc: PropTypes.func,
    errorFunc: PropTypes.func,
    Modal: PropTypes.element
}

export default PrimaryUploadButton;