import React, { useContext, createContext, useEffect, useState } from 'react'
import { TYPE_ANCHOR } from './index.d'

declare global {
  interface Window {
    gapi: any
  }
}

export const MarketplaceV2Context = createContext<any>(null)
export const MarketplaceV2Provider = ({ children }) => {
  const [badgesState, setBadgesState] = useState([])
  const [spritesState, setSpritesState] = useState([])

  // Controllers
  const [openModal, setOpenModal] = useState({})
  const handleOpen = (name: any) => {
    setOpenModal({ [name]: true })
  }
  const handleClose = (name: any) => {
    setOpenModal({ [name]: false })
  }
  const handleClearModal = () => {
    setOpenModal([])
  }

  // For drawers
  const [stateAnchor, setStateAnchor] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor: TYPE_ANCHOR, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setStateAnchor({ ...stateAnchor, [anchor]: open })
  }

  const fetchAssets = async (callback: any, q: any) => {
    try {
      const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY
      await window.gapi.client.init({
        apiKey: API_KEY, // Replace with your Google Drive API Key
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      })

      const folder = q
      const response = await window.gapi.client.drive.files.list({
        q: `'${folder}' in parents`,
        fields: 'files(id, name, webViewLink)',
      })
      const res = response.result.files
      callback(res)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    const source = {
      badges: '19sD4_X6IDSdi2PnXIAu_cYjQeJS7RuLP',
      nfts: '1aSmYsI_GtkXA2nK0RRD7STiZKS1wgabJ',
      classes: '1G0atGwIflWAvElS2nwwgRDo3KyF4i_Mw',
    }
    fetchAssets(setBadgesState, source.badges)
    fetchAssets(setSpritesState, source.nfts)
    return () => {
      setBadgesState([])
      setSpritesState([])
      console.log('Cleared...')
    }
  }, [])

  return (
    <MarketplaceV2Context.Provider
      value={{
        badges: badgesState,
        sprites: spritesState,
        controllers: {
          modal: { handleClose, handleOpen, openModal, handleClearModal },
          drawer: { toggleDrawer, stateAnchor },
        },
      }}
    >
      {children}
    </MarketplaceV2Context.Provider>
  )
}
