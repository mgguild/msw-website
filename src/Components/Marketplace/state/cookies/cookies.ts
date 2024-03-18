/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useCookies } from 'react-cookie';
import moment from 'moment'
import { useOwnedNFTs, useContract, useAddress, } from '@thirdweb-dev/react'
import { Default, CookieData } from '../types'

const initialState: Default = {
    data: {}
}

export const newCookie = createAsyncThunk<string, CookieData>(
    'cookie/createCookie',
    async (cki) => {
        const [cookie, setCookie] = useCookies([`${cki.name}`])
        setCookie(cki.name, cki.data, {expires: moment().add(2, 'weeks').toDate()})

        return `created cookie ${cki.name}: ok`
    }
)

export const getCookie = createAsyncThunk<any, {name: string}>(
    'cookie/getCookie',
    async (cki) => {
        const [cookie, setCookie] = useCookies([`${cki.name}`])
        return cookie
    }
)

export const delCookie = createAsyncThunk<string, {name: string}>(
    'cookie/deleteCookie',
    async (cki) => {
        const [cookie, setCookie, removeCookie] = useCookies([`${cki.name}`])
        removeCookie(cki.name);

        return `deleted cookie ${cki.name}: ok`
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

        builder.addCase(delCookie.fulfilled, (state, action) => {
            console.log(action.payload)
        })
    },
})

export default cookiSlice.reducer