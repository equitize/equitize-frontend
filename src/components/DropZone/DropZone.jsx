import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import PlusIcon from './plusIcon.svg'
import PropTypes from "prop-types";
import ConfigData from '../../config';

// React query
import { useMutation, useQuery, useQueryClient } from 'react-query'

// For redux
import { useSelector } from 'react-redux'
import { getToken } from '../../store/auth'

// React query fetch functions
const fetchFile = async (key) => {
    const res = await fetch(ConfigData.SERVER_URL + '/db/startup/getSignedURLPlus/' + key.queryKey[1], {
        headers: {
            'Authorization': 'Bearer ' + key.queryKey[2]
        }
    })
    return res.json()
}

const addFile = async params => {
    // console.log("TOKEN", params.accessToken)
    return fetch(ConfigData.SERVER_URL + '/db/startup/' + params.endPoint + params.startupId, {
            headers: {
                'Authorization': 'Bearer ' + params.accessToken
            },
            method: 'PUT',
            body: params.formData,
        }) 
}

function DropZone({placeHolderText, acceptedFileTypes, endPoint, startupId}){

    // Get QueryClient from the context
    const queryClient = useQueryClient()

    // Redux useSelector
    const accessToken = useSelector(getToken)

    const dropZoneFile = useQuery(['dropZoneFile', endPoint+startupId, accessToken], fetchFile)
    const fileStatus = dropZoneFile.status

    const mutation = useMutation(addFile, {
        onSuccess: () => {
            queryClient.invalidateQueries('dropZoneFile')
        }
    })
    
    const onDrop = useCallback(async acceptedFiles => {

        // Submit file
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])
        
        mutation.mutate({ endPoint: endPoint, startupId: startupId, formData: formData, accessToken: accessToken })

    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: acceptedFileTypes,
        onDrop: onDrop
    })

    const showFiles = () => {
        return(
            <>
                {mutation.isLoading ? (
                    <div>Uploading file...</div>
                ) :
                <>
                    { fileStatus === 'loading' && (
                        <div>Loading file...</div>
                    )}
                    
                    { fileStatus === 'error' && (
                        <div>Error loading file name</div>
                    )}

                    { fileStatus === 'success' && (
                        <div>Saved file: {dropZoneFile.data.originalName}</div>
                    )}
                </>}

                
            </>
        )
    }

    return (
        <>
            {showFiles()}
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