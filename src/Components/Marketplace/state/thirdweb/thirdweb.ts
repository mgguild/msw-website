/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useOwnedNFTs, useContract, useAddress, } from '@thirdweb-dev/react'
import { ThirdwebState, TWOwnerResult, TWAddresses } from '../types'

const contractAddress = '0xa80c5C9d7d3CF9988f33B30492e3A3556F094b78';
const contractAddressSecond = '0x90ba9328748cf652f9bba12be0436acf4f782076';

const initialState: ThirdwebState = {
    ownerNFTs: {
        data: [],
        isLoading: true,
        error: null
    }
}

export const getOwnerNFTs = createAsyncThunk<TWOwnerResult, {start: number, count: number}>(
    'thirdweb/fetchOwnerNFTs',
    async (params) => {
        const address = useAddress();
        const { contract } = useContract(contractAddress);

        let {data, isLoading, error} = useOwnedNFTs(contract, address, {start: params.start, count: params.count})

        return({data: data, isLoading: isLoading, error: error})
    }
)

export const thirdwebSlice = createSlice({
  name: 'Playfab',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch User NFTs
    builder.addCase(getOwnerNFTs.fulfilled, (state) => {
      state.ownerNFTs = {
        data: state.ownerNFTs.data,
        isLoading: state.ownerNFTs.isLoading,
        error: state.ownerNFTs.error
      }
    })
  },
})

export default thirdwebSlice.reducer