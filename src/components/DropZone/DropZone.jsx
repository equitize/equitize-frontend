import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import PlusIcon from './plusIcon.svg'
import PropTypes from "prop-types";

function DropZone({placeHolderText, acceptedFileTypes, endPoint, startupId}){

    const onDrop = useCallback(async acceptedFiles => {

        const formData = new FormData()
        formData.append('file', acceptedFiles[0])

        //TODO: Hardcoded baseURL
        const response = await fetch('http://localhost:8080/api/db' + endPoint + startupId, {
            method: 'PUT',
            body: formData
        })

        const data = await response.json()
        
        if (data.error) {
            console.log(data.error)
            alert(data.error)
        } else {
            console.log(data)
        }

    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: acceptedFileTypes,
        onDrop: onDrop
    })

    return (
        <div {...getRootProps()} className="flex flex-wrap flex-col bg-gray-100 placeholder-gray-400 hover:bg-gray-300 self-stretch text-center font-bold w-full lg:px-4 py-2 xl:text-xl sm:m-4 rounded-xl text-sm">
            <input {...getInputProps()} />
            {
                acceptedFiles.length > 0 ?
                    <p>{acceptedFiles[0].name}</p>
                    : <>
                        <img src={PlusIcon} alt="Add File Here"/>
                        <p className="text-gray-400">{placeHolderText}</p>
                    </>
            }
        </div>
    )
}

DropZone.propTypes = {
    placeHolderText: PropTypes.string,
    acceptedFileTypes: PropTypes.string,
    endPoint: PropTypes.string,
    startupId: PropTypes.number
}

export default DropZone;