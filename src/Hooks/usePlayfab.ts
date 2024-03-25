import { PlayFab, PlayFabClient } from 'playfab-sdk';
import { create } from 'zustand';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

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
      async (error, result) => {
        const ckies = cookies.getAll()

        if(Object.keys(ckies).length !== 0){
          if(ckies.playerInfo){
            set(() => ({user: ckies.playerInfo}))
          }

          if(ckies.playerTags){
            set(() => ({userTags: ckies.playerTags}))
          }

          if(ckies.userData){
            set(() => ({userData: ckies.userData}))
          }else{
            set(() => ({userData: {}}))
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
