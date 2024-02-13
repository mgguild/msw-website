import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import useToast from '../../../../../hooks/useToast'
import useMarketplaceAuth from '../../../../../hooks/useMarketplaceAuth'
import { TextWrapper } from '../Text'
import { FORM_TYPE, Props } from './index.d'

const Form: React.FC<Props> = (props) => {
  const { name, submitFn } = props
  const { requestOtp } = useMarketplaceAuth()
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [disableOtp, setDisableOtp] = useState<boolean>(false)
  const [timer, setTimer] = useState(10)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let interval: any
    if (disableOtp) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [disableOtp])
  useEffect(() => {
    if (timer === 0) {
      setDisableOtp(false)
      setTimer(10)
    }
  }, [timer])

  const clearFields = () => {
    setEmail('')
    setCode('')
  }

  const handleEmail = (val: any) => {
    setEmail(val)
  }

  const handleRequestOtp = (e: any) => {
    e.preventDefault()
    if (!email) {
      toast.warning('Please provide email')
      return ''
    }
    const res = requestOtp()
    // sendEmail({ email, code: res })
    sessionStorage.setItem('otp', res)
    setDisableOtp(true)
    toast.success('OTP Requested!')
    return ''
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')
    try {
      const res = await submitFn({ email }, code)
      toast.success(res.status)
      sessionStorage.removeItem('otp')
      clearFields()
    } catch (err: any) {
      setError(err.message)
      toast.error(`Error: ${err.message}`)
      console.error(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '5px 0px' }}>
        <label htmlFor="email" style={{ width: '100%' }}>
          <TextWrapper align="left">
            Email
            <div style={{ display: 'flex', width: '100%' }}>
              <input
                style={{ width: '100%' }}
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleEmail(e.target.value)}
              />
            </div>
          </TextWrapper>
        </label>
        <label htmlFor="code" style={{ width: '100%' }}>
          <TextWrapper align="left">
            Verification Code
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button type="button" style={{ flex: 1 }} onClick={(e) => handleRequestOtp(e)} disabled={disableOtp}>
                {!disableOtp ? 'Request' : timer}
              </button>
              <input
                style={{ flex: 1 }}
                required
                name="code"
                id="code"
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </TextWrapper>
        </label>
      </div>
      {/* <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      {name.toLowerCase() === FORM_TYPE.REGISTER && (
        <TextWrapper style={{ margin: '5px 0' }}>
          <p>Please agree to the Terms of Use and Privacy Policy before registering</p>
        </TextWrapper>
      )}
      <button type="submit">{name}</button>
    </form>
  )
}

export default Form
