import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { thirdwebReducer } from './thirdweb';
import { cookieReducer } from './cookies';
import { playfabReducer } from './playfab'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    thirdweb: thirdwebReducer,
    cookies: cookieReducer,
    playfab: playfabReducer,
  },
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
