import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import InfoIcon from './info.svg'

function PrimaryUploadButton({ text, properties, moreInfo, labelId, moreInfoFunc, errorFunc, Modal, startupId }){
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

    const fileUpload = async (fileToUpload) => {
        // TODO API CALL
        const formData = new FormData()
        formData.append('file', fileToUpload)

        // TODO: Hardcoded baseURL
        const response = await fetch('http://localhost:8080/api/db/startup/' + labelId + '/' + startupId, {
            method: 'PUT',
            body: formData
        })

        const data = await response.json()
        console.log(data)

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
    Modal: PropTypes.element,
    startupId: PropTypes.number
}

export default PrimaryUploadButton;