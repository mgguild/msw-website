/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PlayFabClient } from 'playfab-sdk'
import { PlayfabState, EntityKey, UserGuildData, PFGuildData, PFMGGMembership, MembershipData } from '../types'
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { result } from 'lodash';

const cookies = new Cookies(null, { path: '/' });

const initialState: PlayfabState = {
 isInitialized: false,
 isLoggedIn: false,
 guildList: null,
 user: {
  guild: {
    status: null,
    coMembers:[]
  }
 }
};

const timeout = (ms = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Gotcha!!!'), ms)
  })
}

// const waitUntil = (value: any, ms = 1000) => {
//   return new Promise((resolve) => {

//     setTimeout(() => resolve('Gotcha!!!'), ms)
//   })
// }

export const createGuild = createAsyncThunk<UserGuildData, {guildName: string, userEntity: EntityKey}>(
  'playfab/createGuild',
  async ({guildName, userEntity}) => {
    var _result: UserGuildData = {
      status: null,
      coMembers: [],
    };

    PlayFabClient.ExecuteCloudScript(
      {
          FunctionName: 'CreateTitleGroup',
          FunctionParameter: {
              name: guildName,
              creatorEntity: userEntity,
          },
      },
      async (error, result) => {
        if (error) {
          return;
        } else {
          if (result.data.Error) {
            toast.error(`Guild name ${guildName} not available`);
            return;
          } else if (result.data.FunctionResult) {
            _result = {
              name: guildName,
              entity: result.data.FunctionResult.groupData,
              role: 'Administrators',
              status: 'success',
              coMembers: [],
            }
          }
        }
      },
    );

    await timeout(2000)
    if (_result.status === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`create guild function timeout!`)
    }

    return _result;
  },
);

export const editGuild = createAsyncThunk<UserGuildData, {_guildName: string, _groupEntity: EntityKey}>(
  'playfab/editGuild',
  async ({_guildName, _groupEntity}) => {
    var _result: UserGuildData = {
      status: null,
      coMembers: [],
    };

    PlayFabClient.ExecuteCloudScript(
      {
          FunctionName: 'UpdateGuild',
          FunctionParameter: {
              groupName: _guildName,
              groupEntity: _groupEntity,
          },
      },
      async (error, result) => {
        if (error) {
          return;
        } else {
          if (result.data.Error) {
            toast.error(`Guild name ${_guildName} not available`);
            return;
          } else if (result.data.FunctionResult.SetResult === 'Updated') {
            _result = {
              name: _guildName,
              entity: _groupEntity,
              role: 'Administrators',
              status: 'success',
              coMembers: [],
            }
          }
        }
      },
    );

    await timeout(2000)
    if (_result.status === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`edit guild function timeout!`)
    }

    return _result;
  },
);

export const deleteGuild = createAsyncThunk<UserGuildData, {_guildName: string, _groupEntity: EntityKey}>(
  'playfab/deleteGuild',
  async ({_guildName, _groupEntity}) => {
    var _result: UserGuildData = {
      status: null,
      coMembers: [],
    };
    console.log(_groupEntity);

    PlayFabClient.ExecuteCloudScript(
      {
          FunctionName: 'DeleteGuild',
          FunctionParameter: {
              groupEntity: _groupEntity,
          },
      },
      async (error, result) => {
        if (error) {
          console.error(error.errorMessage)
          return;
        } else {
          if (result.data.Error) {
            console.log("DELETE ACTION")
            console.log(result)

            toast.error(`Something went wrong`);
            return;
          } else if (result.data.FunctionResult) {
            _result = {
              status: 'succesfully deleted',
              coMembers: [],
            }
          }
        }
      },
    );

    await timeout(2000)
    if (_result.status === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`edit guild function timeout!`)
    }

    return _result;
  },
);

export const getPlyrGuild = createAsyncThunk<UserGuildData, EntityKey>(
  'playfab/getPlayerGuild',
  async (playerEntity) => {
    var _result: UserGuildData = {
      status: null,
      coMembers: [],
    };
    console.log("PLAYER ENTITY")
    console.log(playerEntity);

    PlayFabClient.ExecuteCloudScript(
      {
        FunctionName: 'GetListGuilds',
        FunctionParameter: {
          playerEntity: playerEntity,
        },
      },
      async (error, result) => {
        if (error) {
          console.error(error.errorMessage);
          return;
        } else if (result.data.FunctionResult) {
          console.log(result);
          if(result.data.FunctionResult.GuildData){
            _result = {
              name: result.data.FunctionResult.GuildData.GroupName,
              entity:result.data.FunctionResult.GuildData.Group,
              role: result.data.FunctionResult.GuildData.Roles[0].RoleName,
              status: 'success',
              coMembers: result.data.FunctionResult.MembersData,
            };

            console.log("_result");
            console.log(_result);
            return
          }else{
            console.warn('Group Date returned empty');
          }
          console.log('Not A member of any group');
          _result = {
            status: 'Not A Memmber',
            coMembers: [],
          };
        }
      },
    );

    await timeout(2000);

    if (_result.status === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`Fetch user guild timeout!`)
    }

    return _result;
  },
);

export const setGuildfromCookies = createAsyncThunk<UserGuildData>(
  'playfab/setGuildfromCookies',
  async () => {
    var _result: UserGuildData = {
      status: null,
      coMembers: [],
    };

    const ckies = cookies.getAll();

    if (ckies.userGuild) {
      _result = ckies.userGuild
    }


    return _result
  },
);

export const getGuildList = createAsyncThunk<PFGuildData[] | null>(
  'playfab/getGuildList',
  async () => {
    var _result: PFGuildData[] | null = null

    PlayFabClient.ExecuteCloudScript(
      {
        FunctionName: 'GetListGuilds',
      },
      (error, result) => {
        if (error) {
          toast.error(error.errorMessage);
          return;
        } else {
          _result = result.data.FunctionResult.Groups
        }
      },
    );

    await timeout(2000)
    if (_result === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`create guild function timeout!`)
    }

    return _result
  },
);

export const getMembershipT1 = createAsyncThunk<MembershipData, PFMGGMembership>(
  'playfab/getMembershipT1',
  async (args) => {
    var _result: MembershipData = {
      msg: 'empty',
      dateData: [],
      transcHash: '',
      tier: 'tier1'
    };

    PlayFabClient.ExecuteCloudScript(
      {
        FunctionName: 'MGGMember',
        FunctionParameter:{
          playerId: args.playerId,
          subsTier: 'tier1',
          transc: args.transc
        }
      },
      (error, result) => {
        if (error) {
          toast.error(error.errorMessage);
          return;
        } else {
          _result = {
            msg: result.data.FunctionResult.msg,
            dateData: result.data.FunctionResult.dateData,
            transcHash: args.transc,
            tier: 'tier1'
          }
        }
      },
    );

    await timeout(2000)
    if (_result === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`Get Membership function timeout!`)
    }

    return _result
  },
);

export const getMembershipT2 = createAsyncThunk<MembershipData, PFMGGMembership>(
  'playfab/getMembershipT2',
  async (args) => {
    var _result: MembershipData = {
      msg: 'empty',
      dateData: [],
      transcHash: '',
      tier: 'tier2'
    };

    PlayFabClient.ExecuteCloudScript(
      {
        FunctionName: 'MGGMember',
        FunctionParameter:{
          playerId: args.playerId,
          subsTier: 'tier2',
          transc: args.transc
        }
      },
      (error, result) => {
        if (error) {
          toast.error(error.errorMessage);
          return;
        } else {
          _result = {
            msg: result.data.FunctionResult.msg,
            dateData: result.data.FunctionResult.dateData,
            transcHash: args.transc,
            tier: 'tier2'
          }
        }
      },
    );

    await timeout(2000)
    if (_result === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`Get Membership function timeout!`)
    }

    return _result
  },
);

export const getMembershipT3 = createAsyncThunk<MembershipData, PFMGGMembership>(
  'playfab/getMembershipT3',
  async (args) => {
    var _result: MembershipData = {
      msg: 'empty',
      dateData: [],
      transcHash: '',
      tier: 'tier3',
    };

    PlayFabClient.ExecuteCloudScript(
      {
        FunctionName: 'MGGMember',
        FunctionParameter:{
          playerId: args.playerId,
          subsTier: 'tier3',
          transc: args.transc
        }
      },
      (error, result) => {
        if (error) {
          toast.error(error.errorMessage);
          return;
        } else {
          _result = {
            msg: result.data.FunctionResult.msg,
            dateData: result.data.FunctionResult.dateData,
            transcHash: args.transc,
            tier: 'tier3'
          }
        }
      },
    );

    await timeout(2000)
    if (_result === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`Get Membership function timeout!`)
    }

    return _result
  },
);

export const getMembershipData = createAsyncThunk<MembershipData, {playerId: string}>(
  'playfab/getMembershipData',
  async (args) => {
    var _result: MembershipData = {
      dateData: [],
      transcHash: '',
      tier: ''
    };

    PlayFabClient.ExecuteCloudScript(
      {
        FunctionName: 'GetMGGMemberData',
        FunctionParameter:{
          playerId: args.playerId,
        }
      },
      (error, result) => {
        if (error) {
          toast.error(error.errorMessage);
          return;
        } else {
          if(Object.hasOwn(result.data.FunctionResult, 'MGG_Membership')){
            let res = JSON.parse(result.data.FunctionResult.MGG_Membership.Value);
            _result = {
              dateData: res.dateData ?? [],
              transcHash: res.transcHash ?? '',
              tier: res.tier ?? '',
            }
          }
        }
      },
    );

    await timeout(2000)
    if (_result === null) {
      toast.error(`Somthing went wrong!`);
      console.warn(`Get Membership function timeout!`)
    }

    return _result
  },
);


export const playFabLogOut = createAsyncThunk<any>(
  'playfab/logout',
  async () => {
    var _result = null

    return _result
  },
);


export const playfabSlice = createSlice({
  name: 'Playfab',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create player guild
    builder.addCase(createGuild.fulfilled, (state, action: PayloadAction<UserGuildData>) => {

      if(action.payload.status === 'success'){
        state.user.guild = action.payload;
      }
    });

    //Edit player guild
    builder.addCase(editGuild.fulfilled, (state, action: PayloadAction<UserGuildData>) => {
      if(action.payload.status === 'success'){
        state.user.guild = action.payload;
      }
    });

    //Delete player guild
    builder.addCase(deleteGuild.fulfilled, (state, action: PayloadAction<UserGuildData>) => {
      if(action.payload.status === 'succesfully deleted'){
        state.user.guild = action.payload;
      }
    });

    //Get player guild if any
    builder.addCase(getPlyrGuild.fulfilled, (state, action: PayloadAction<UserGuildData>) => {
      if(action.payload.status === 'success'){
        state.user.guild = action.payload;
      }
    });

    //Set state from cookie data
    builder.addCase(setGuildfromCookies.fulfilled, (state, action: PayloadAction<UserGuildData>) => {
      state.user.guild = action.payload;
    });

    //Get guild list
    builder.addCase(getGuildList.fulfilled, (state, action: PayloadAction<PFGuildData[] | null>) => {
      state.guildList = action.payload;
    });

    //Player log out
    builder.addCase(playFabLogOut.fulfilled, (state, action: PayloadAction<any>) => {
      state.user.guild = {
        status: null,
        coMembers: [],
      };
    });

    builder.addCase(getMembershipT1.fulfilled, (state, action: PayloadAction<MembershipData>) => {
      state.user.mggMembership = {
        dateData: action.payload.dateData,
        transcHash: action.payload.transcHash,
        tier: action.payload.tier
      }
    });

    builder.addCase(getMembershipT2.fulfilled, (state, action: PayloadAction<MembershipData>) => {
      state.user.mggMembership = {
        dateData: action.payload.dateData,
        transcHash: action.payload.transcHash,
        tier: action.payload.tier
      }
    });

    builder.addCase(getMembershipT3.fulfilled, (state, action: PayloadAction<MembershipData>) => {
      state.user.mggMembership = {
        dateData: action.payload.dateData,
        transcHash: action.payload.transcHash,
        tier: action.payload.tier
      }
    });

    builder.addCase(getMembershipData.fulfilled, (state, action: PayloadAction<MembershipData>) => {
      state.user.mggMembership = {
        dateData: action.payload.dateData,
        transcHash: action.payload.transcHash,
        tier: action.payload.tier
      }
    });

  },
});

export default playfabSlice.reducer;
