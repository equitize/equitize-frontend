import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { apiCallBegan, authApiCallBegan } from './middleware/apiActions'

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        data: {},
        errorMessage: ''
    },
    reducers: {
        // Actions will only be implemented after passing api.js middleware
        loggedIn: (state, action) => {
            state.isLoggedIn = true
            state.data = action.payload
        },
        loggedOut: (state) => {
            state.isLoggedIn = false
            state.data = {}        // deletes state.data as action.payload.user is empty.
        },
        authRequestFailed: (state, action) => {
            state.isLoggedIn = false,
            state.errorMessage = action.payload
        },

        signedUp: (state, action) => {
            state.isLoggedIn = true
            state.data = action.payload
        }
    }
})

export const { loggedIn, loggedOut, authRequestFailed, signedUp } = slice.actions
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

const signUpUrl = "/startup"
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