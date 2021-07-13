import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ConfigData from "../../config";

function PrimaryUploadImageButton({ text, properties, labelId, errorFunc, startupId }){
    let cssProperties = classNames(properties,
        "flex flex-wrap bg-gray-100 placeholder-gray-400 hover:bg-gray-300 w-full self-stretch text-center font-bold py-4 px-4 m-1 rounded-xl text-sm lg:text-xl")

    const [image, setImage] = useState(null)

    const fileUpload = async (fileToUpload) => {
        // TODO API CALL
        console.log(fileToUpload)
        
        const formData = new FormData()
        formData.append('file', fileToUpload)

        const response = await fetch(ConfigData.SERVER_URL + '/db/startup/' + labelId + '/' + startupId, {
            method: 'PUT',
            body: formData
        })

        const data = await response.json()
        console.log(data)

        return true
    }

    const fileSelectedHandler = (event) => {
        let newImage = event.target.files[0]
        if (!newImage.name.match(/.(jpg|jpeg|png|gif)$/i)){
            errorFunc("Invalid File Type")
        }
        else{
            let success = fileUpload(newImage)
            if (success){
                setImage(URL.createObjectURL(newImage))
            }
            else{
                console.error("An unexpected error has occurred")
            }
        }
    };

    return(
        <>
            {
                image ?
                        <>
                            <label htmlFor={labelId} className={cssProperties}>
                                <img src={image} alt="File uploaded" className="lg:h-60"/>
                            </label>
                            <input
                                id={labelId}
                                style={{display:'none'}}
                                type={"file"}
                                onChange={(e) => fileSelectedHandler(e)} />
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

PrimaryUploadImageButton.propTypes = {
    text: PropTypes.string,
    properties: PropTypes.any,
    labelId: PropTypes.string,
    errorFunc: PropTypes.func,
    startupId: PropTypes.number
}


export default PrimaryUploadImageButton;