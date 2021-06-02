import axios from 'axios'
import * as actions from './apiActions'

// SNA Store => Next => Action
const authApi = ({ dispatch }) => next => async action => {
    if (action.type !== actions.authApiCallBegan.type) return next(action)

    const {url, method, data, onStart, onSuccess, onError} = action.payload

    if (onStart) dispatch({ type: onStart })

    next(action)

    try {

        const response = await axios.request({
            // withCredentials: true,
            // credentials: 'include',
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json",
            //     "Access-Control-Allow-Credentials": true,
            //     'Access-Control-Allow-Origin': true
            //     },
            baseURL: 'https://dev-cus1s5do.au.auth0.com/oauth', // Store in configuration file for real life application
            url,
            method,
            data
        })
        // General
        dispatch(actions.apiCallSuccess(response.data))
        //
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } 
    catch(error) {
        // General
        dispatch(actions.apiCallFailed(error.message))
        // Specific
        if (onError) {
            dispatch({ type: onError, payload: error.message })
        }
    }
}

export default authApi