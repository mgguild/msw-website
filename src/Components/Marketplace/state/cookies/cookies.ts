/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie';
import moment from 'moment'
import { useOwnedNFTs, useContract, useAddress, } from '@thirdweb-dev/react'
import { Default, CookieData } from '../types'

const cookies = new Cookies(null, { path: '/' });

const initialState: Default = {
    data: {}
}

export const newCookie = createAsyncThunk<string, CookieData>(
    'cookie/createCookie',
    async (cki) => {
        cookies.set(`${cki.name}`, cki.data, {expires: moment().add(2, 'weeks').toDate(), secure: true})
        return `created cookie ${cki.name}: ok`
    }
)

export const getCookie = createAsyncThunk<any, {name: string}>(
    'cookie/getCookie',
    async (cki) => {
        return cookies.get(`${cki.name}`)
    }
)

export const delCookies = createAsyncThunk<string, {names: string[]}>(
    'cookie/deleteCookies',
    async ({names}) => {

        names.forEach(name => {
            cookies.remove(`${name}`)
        });

        return `deleted cookie ${names}: ok`
    }
)

export const getCookies = createAsyncThunk<string>(
    'cookie/getCookie',
    async () => {
        return cookies.getAll();
    }
)

export const cookiSlice = createSlice({
    name: 'Cookies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(newCookie.fulfilled, (state, action) => {
            console.log(action.payload)
        })

        builder.addCase(getCookie.fulfilled, (state, action) => {
            console.log(action.payload)
        })

        builder.addCase(delCookies.fulfilled, (state, action) => {
            console.log(action.payload)
        })
    },
})

export default cookiSlice.reducer