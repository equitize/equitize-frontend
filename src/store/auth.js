import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { apiCallBegan, authApiCallBegan } from './middleware/apiActions'

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        data: {},
        debug: '',
        stateChanged: false
    },
    reducers: {
        // Actions will only be implemented after passing api.js middleware
        stateChanged: (state) => {
            state.stateChanged = !state.stateChanged
        },
        loggedIn: (state, action) => {
            state.isLoggedIn = true
            state.data = action.payload
        },
        loggedOut: (state) => {
            state.isLoggedIn = false
            state.data = {}        // deletes state.data as action.payload.user is empty.
        },
        authRequestFailed: (state, action) => {
            state.debug = action.payload
        },

        signedUp: (state, action) => {
            state.isLoggedIn = true
            state.data = action.payload
        },

        videoUploaded: (state, action) => {
            state.data.video = action.payload
        },
        pitchDeckUploaded: (state, action) => {
            state.data.pitchDeck = action.payload
        }
    }
})

export const { stateChanged, loggedIn, loggedOut, authRequestFailed, signedUp, videoUploaded, pitchDeckUploaded } = slice.actions
export default slice.reducer

// Action creators
const url = "/token"
export const logIn = credentials => authApiCallBegan({
    url: url,
    method: "post",
    data: credentials,
    onSuccess: loggedIn.type,
    onError: authRequestFailed.type
})

const signUpUrl = "/startup"        //TODO: Update this
export const signUp = credentials => apiCallBegan({
    url: signUpUrl,
    method: "post",
    data: credentials,
    onSuccess: signedUp.type,
    onError: authRequestFailed.type
})

// export const logOut = () => apiCallBegan({
//     url: url + '/logout',
//     onSuccess: loggedOut.type
// })

// Selectors with Memoization
export const getIsLoggedIn = createSelector(
    state => state.auth,
    auth => auth.isLoggedIn
)

export const getStartupId = createSelector(
    state => state.auth,
    auth => {
        if (auth.isLoggedIn) return auth.data.id
        else return 0
    }
)

export const getStartupVideo = createSelector(
    state => state.auth,
    auth => {
        if (auth.data.video) return auth.data.video.fileName
        else return 0
    }
)

export const getStartupPitchDeck = createSelector(
    state => state.auth,
    auth => {
        if (auth.data.pitchDeck) return auth.data.pitchDeck.fileName
        else return 0
    }
)