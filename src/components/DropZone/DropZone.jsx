import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import PlusIcon from './plusIcon.svg'
import PropTypes from "prop-types";

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { videoUploaded, getStartupVideo,getStartupPitchDeck, pitchDeckUploaded } from '../../store/auth'

function DropZone({placeHolderText, acceptedFileTypes, endPoint, startupId}){

    const dispatch = useDispatch()
    let file = ""
    if (endPoint === "/startup/video/") {
        file = useSelector(getStartupVideo)
    } else if (endPoint === "/startup/pitchDeck/") {
        file = useSelector(getStartupPitchDeck)
    }

    // const [ dropFile, setDropFile ] = useState({
    //     file: ""
    // })
    
    const onDrop = useCallback(async acceptedFiles => {

        // console.log('In onDrop received file: ', acceptedFiles[0])
        // setDropFile(prevState => ({
        //     ...prevState,
        //     file: acceptedFiles[0]
        // }))

        if (endPoint === "/startup/video/") {
            dispatch(videoUploaded({ fileName: acceptedFiles[0].name }))
        } else if (endPoint === "/startup/pitchDeck/") {
            dispatch(pitchDeckUploaded({ fileName: acceptedFiles[0].name }))
        }

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

    const showFiles = () => {
        return(
            <div>
                <h3>Current file: {file === 0 ? "NIL" : file}</h3>
            </div>
        )
    }

    return (
        <>
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
            {showFiles()}
        </>
    
    )
}

DropZone.propTypes = {
    placeHolderText: PropTypes.string,
    acceptedFileTypes: PropTypes.string,
    endPoint: PropTypes.string,
    startupId: PropTypes.number
}

export default DropZone;