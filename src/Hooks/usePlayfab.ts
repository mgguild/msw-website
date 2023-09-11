import { PlayFab, PlayFabClient } from 'playfab-sdk';
import { create } from 'zustand';
import { toast } from 'react-toastify';

const usePlayfab = create(set => ({
  initialized: false,
  user: null,
  userTags: [],
  userData: null,
  start: async () => {
    PlayFab.settings.titleId = process.env.REACT_APP_PLAYFAB_TITLE_ID ?? '';
    PlayFab.settings.developerSecretKey = process.env.REACT_APP_PLAYFAB_DEV_KEY ?? '';

    PlayFabClient.LoginWithCustomID(
      {
        CustomId: 'MSWAnonymousGuest',
        CreateAccount: true,
        CustomTags: { AccType: 'AnonymousGuest' },
      },
      (error, result) => {
        if (error) {
          toast(error.errorMessage, { type: 'error' });
          set({ initialized: false });
          return;
        }
      },
    );

    set({ initialized: true });
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

        console.log(result);
      },
    );

    console.log(test);
  },
  setUserInfo: (userInfo: any) => {
    console.log(userInfo);
    set({ user: userInfo });
  },
  setUserTags: (tags: string[]) => {
    console.log(tags);
    set({ userTags: tags });
  },
  setUserData: (data: any) => {
    console.log(data);
    set({ userData: data });
  },
}));

export default usePlayfab;
