import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../containers/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
