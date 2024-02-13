import React, { useState, useEffect } from 'react'
import useTabVisibility from '../hooks/useTabVisibility'

const FAST_INTERVAL = 10000
const SLOW_INTERVAL = 60000

const RefreshContext = React.createContext({ slow: 0, fast: 0 })

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }) => {
  const [slow, setSlow] = useState(0)
  const [fast, setFast] = useState(0)
  const { tabVisibleRef } = useTabVisibility()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (tabVisibleRef.current) {
        setFast((prev) => prev + 1)
      }
    }, FAST_INTERVAL)
    return () => clearInterval(interval)
  }, [tabVisibleRef])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (tabVisibleRef.current) {
        setSlow((prev) => prev + 1)
      }
    }, SLOW_INTERVAL)
    return () => clearInterval(interval)
  }, [tabVisibleRef])

  return <RefreshContext.Provider value={{ slow, fast }}>{children}</RefreshContext.Provider>
}

export { RefreshContext, RefreshContextProvider }
