import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import api from './middleware/api'
import authApi from './middleware/authApi'
import thunk from 'redux-thunk';

// Redux persist
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        thunk,
        api,
        authApi
    ]
})

export default store