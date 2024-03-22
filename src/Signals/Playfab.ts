import { signal } from '@preact/signals-react';
import { PlayFab, PlayFabClient } from 'playfab-sdk';
import { toast } from 'react-toastify';

const pf_initialized = signal(false);

export class callPlayfab {
  public initialize() {
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
          pf_initialized.value = true;
          return;
        }
      },
    );

    pf_initialized.value = true;
  }
}
