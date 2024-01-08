import { PlayFab, PlayFabClient } from 'playfab-sdk';
import { create } from 'zustand';
import { toast } from 'react-toastify';

const usePlayfab = create(set => ({
  initialized: false,
  user: '',
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
}));

export default usePlayfab;
