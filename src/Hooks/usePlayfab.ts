import { PlayFab, PlayFabClient, PlayFabCloudScript } from 'playfab-sdk';
import { create } from 'zustand';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

const usePlayfab = create(set => ({
  leaderboard: [],
  initialized: false,
  user: '',
  userGuild: null,
  userTags: [],
  userData: '',
  start: async () => {
    PlayFab.settings.titleId = process.env.REACT_APP_PLAYFAB_TITLE_ID ?? '';
    PlayFab.settings.developerSecretKey = process.env.REACT_APP_PLAYFAB_DEV_KEY ?? '';

    PlayFabClient.LoginWithCustomID(
      {
        CustomId: 'MSWAnonymousGuest',
        CreateAccount: true,
        CustomTags: { AccType: 'AnonymousGuest' },
      },
      async (error, result) => {
        const ckies = cookies.getAll();

        if (Object.keys(ckies).length !== 0) {
          if (ckies.playerInfo) {
            set(() => ({ user: ckies.playerInfo }));
          }

          if (ckies.playerTags) {
            set(() => ({ userTags: ckies.playerTags }));
          }

          if (ckies.userGuild) {
            set(() => ({ userGuild: ckies.userGuild }));
          }

          if (ckies.userData) {
            set(() => ({ userData: ckies.userData }));
          } else {
            set(() => ({ userData: {} }));
          }
        }

        if (error) {
          toast(error.errorMessage, { type: 'error' });
          set({ initialized: false });
          return;
        }
      },
    );

    set({ initialized: true });
  },
  getLeaderboard: () => {
    PlayFab.settings.titleId = process.env.REACT_APP_PLAYFAB_TITLE_ID ?? '';
    PlayFab.settings.developerSecretKey = process.env.REACT_APP_PLAYFAB_DEV_KEY ?? '';

    PlayFabClient.GetLeaderboard(
      {
        StartPosition: 0,
        StatisticName: 'Kills',
      },
      (error, result) => {
        if (error) {
          toast(error.errorMessage, { type: 'error' });
          set({ initialized: false });
          return;
        }
        set({ leaderboard: result.data.Leaderboard });
      },
    );
  },
  getTitleData: async () => {
    const test = await PlayFabClient.GetTitleData(
      { Keys: ['IsOngoingEvent'] },
      (error, result) => {
        if (error) {
          toast(error.errorMessage, { type: 'error' });
          set({ request: 0 });
          return;
        }
      },
    );
  },
  getGuilds: async () => {
    PlayFabClient.ExecuteCloudScript(
      {
        FunctionName: 'GetListGuilds',
      },
      (error, result) => {
        if (error) {
          toast.error(error.errorMessage);
          return;
        } else {
          // console.log(result);
        }
      },
    );
  },
  setUserInfo: (userInfo: any) => {
    set({ user: userInfo });
  },
  setUserTags: (tags: string[]) => {
    set({ userTags: tags });
  },
  setUserData: (data: any) => {
    set({ userData: data });
  },
  setUserGuild: (data: any) => {
    set({ userGuild: data });
  },
}));

export default usePlayfab;
