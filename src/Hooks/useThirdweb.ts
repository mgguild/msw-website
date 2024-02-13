import { useChain, useConnectionStatus } from '@thirdweb-dev/react';
import { create } from 'zustand';
import { useState, useEffect } from 'react';

const ThirdWeb = create(set => ({
  useChain: () => useChain(),
  useStatus: () => useConnectionStatus(),
  setChain: () => {
    set({ useChain: () => useChain() });
  },
  setStatus: () => {
    set({ useStatus: () => useConnectionStatus() });
  },
  useStart: () => {
    const _setChain = ThirdWeb((state: any) => state.setChain);
    const _setStatus = ThirdWeb((state: any) => state.setStatus);
    useEffect(() => {
      _setChain();
      _setStatus();
    }, [useChain(), useConnectionStatus()]);
  },
}));

export default ThirdWeb;
