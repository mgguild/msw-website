/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PlayFabCloudScript, PlayFabClient } from 'playfab-sdk'
import { PlayfabState, PlayfabLoginResult } from '../types'

interface UserCreds {
  login: string
  password: string
}

interface UserSignUp {
  email: string
  username: string
  password: string
}

const initialState: PlayfabState = {
  isInitialized: false,
  isLoggedIn: false,
  user: {
    data: null,
    walletAddress: null,
  },
}

const InfoRequestParams: PlayFabClientModels.GetPlayerCombinedInfoRequestParams = {
  GetUserAccountInfo: true,
  GetCharacterInventories: false,
  GetCharacterList: false,
  GetPlayerProfile: false,
  GetPlayerStatistics: false,
  GetTitleData: false,
  GetUserData: true,
  UserDataKeys: ['WalletAddress'],
  GetUserInventory: false,
  GetUserReadOnlyData: false,
  GetUserVirtualCurrency: false,
}

const timeout = (ms = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Gotcha!!!'), ms)
  })
}

export const initializePlayfabAsync = createAsyncThunk<PlayFabClientModels.LoginResult | null, null>(
  'playfab/fetchUserWithPlayFabAsync',
  async (userCreds) => {
    let _result

    PlayFabClient.LoginWithCustomID(
      {
        CustomId: 'MSWAnonymousGuest',
        CreateAccount: true,
        CustomTags: { AccType: 'AnonymousGuest' },
      },
      (error, result) => {
        if (error) {
          console.error(error.errorMessage)
          _result = null
          return
        }
        _result = result
      },
    )

    await timeout(2000)

    return _result
  },
)

export const fetchPlayfabUser = createAsyncThunk<PlayfabLoginResult | null, UserCreds>(
  'playfab/fetchPlayfabUser',
  async (userCreds) => {
    let _result

    // Check if email regex
    /* eslint-disable no-useless-escape */
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (re.test(userCreds.login)) {
      PlayFabClient.LoginWithEmailAddress(
        {
          Email: userCreds.login,
          Password: userCreds.password,
          InfoRequestParameters: InfoRequestParams,
        },
        (error, result) => {
          if (error) {
            console.error(error.errorMessage)
            return
          }
          _result = result
        },
      )
    } else {
      PlayFabClient.LoginWithPlayFab(
        {
          Username: userCreds.login,
          Password: userCreds.password,
          InfoRequestParameters: InfoRequestParams,
        },
        (error, result) => {
          if (error) {
            console.error(error.errorMessage)
            _result = null
            return
          }
          _result = result
        },
      )
    }

    await timeout(1800)
    if (_result === undefined) {
      console.warn(`fetch user timeout!`)
    }

    return _result
  },
)

export const registerUser = createAsyncThunk<
  PlayFabClientModels.RegisterPlayFabUserResult | PlayFabModule.IPlayFabError | null,
  UserSignUp
>('playfab/registerUser', async (params) => {
  let _result

  PlayFabClient.RegisterPlayFabUser(
    {
      Email: params.email,
      Username: params.username,
      Password: params.password,
      RequireBothUsernameAndEmail: true,
    },
    (error, result) => {
      if (error) {
        console.error(error.errorMessage)
        _result = error
        return
      }
      _result = result
    },
  )

  await timeout(1800)
  if (_result === undefined) {
    console.warn(`register user timeout!`)
  }

  return _result
})

export const bindWallet = createAsyncThunk<
  PlayFabCloudScriptModels.ExecuteFunctionResult | null,
  { address: string; userId: string }
>('playfab/bindWallet', async (params) => {
  let _result

  PlayFabCloudScript.ExecuteFunction(
    {
      FunctionName: 'CheckWalletAddress',
      FunctionParameter: {
        wallet: params.address,
        playFabID: params.userId,
      },
    },
    (error, result) => {
      if (error) {
        console.error(error.errorMessage)
        _result = null
        return
      }

      if (result.data.FunctionResult) {
        console.log('Account wallet bound')
        _result = result
      } else {
        _result = null
        console.warn('Error: Wallet address already in use!')
        alert('Error: Wallet address already in use!')
      }
    },
  )

  await timeout(1800)
  if (_result === undefined) {
    console.warn(`Bind wallet timeout! try again a few seconds!`)
  }
  return _result
})

export const playfabSlice = createSlice({
  name: 'Playfab',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Initialize Playfab
    builder.addCase(initializePlayfabAsync.fulfilled, (state) => {
      state.isInitialized = true
    })
    // Login to Playfab
    builder.addCase(fetchPlayfabUser.fulfilled, (state, action: PayloadAction<PlayfabLoginResult>) => {
      state.isLoggedIn = true
      state.user.data = action.payload.data.InfoResultPayload

      if (action.payload.data.InfoResultPayload.UserData) {
        state.user.walletAddress = action.payload.data.InfoResultPayload.UserData.WalletAddress
          ? action.payload.data.InfoResultPayload.UserData.WalletAddress.Value
          : null
      }
    })
    // Register user to Playfab
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log(action.payload)
    })
    // Bind wallet to playfab account
    builder.addCase(bindWallet.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  },
})

export default playfabSlice.reducer
