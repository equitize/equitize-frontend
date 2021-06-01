import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import PlusIcon from './plusIcon.svg'
import PropTypes from "prop-types";

function DropZone({placeHolderText, acceptedFileTypes, endPoint}){
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles[0])
        console.log(`Sending file to ${endPoint}`)
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
    endPoint: PropTypes.string
}

export default DropZone;