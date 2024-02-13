import React, { useState } from 'react'
import { Grid } from '@mui/material'

const withGridLayout = (WrappedComponent) => {
  return (props) => {
    const [loaded, setIsLoaded] = useState(false)
    const { mediaQ } = props
    return (
      <Grid item {...mediaQ}>
        <WrappedComponent {...props} />
      </Grid>
    )
  }
}

export default withGridLayout
