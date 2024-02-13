import React, { useState, useEffect, useRef } from 'react'
import useMarketplaceAuth from '../../../../../hooks/useMarketplaceAuth'
import Form from '../Form'

const RegistrationForm: React.FC = () => {
  const { register } = useMarketplaceAuth()
  return (
    <>
      <h2>New Registration:</h2>
      <Form name="Register" submitFn={register} />
    </>
  )
}

export default RegistrationForm
