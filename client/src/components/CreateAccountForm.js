import { useState } from "react"

function CreateAccountForm({ onLogin }) {
  const [walletKey, setWalletKey] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    setErrors([])
    fetch('/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "wallet_key": walletKey,
        password,
        "password_confirmation": passwordConfirmation,
      }),
    }).then(r => {
      if(r.ok) {
        r.json().then(walletKey => onLogin(walletKey))
      } else {
        r.json().then(err => setErrors(err.errors))
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className='form-field'>
        <label>Wallet Key </label> 
        {/* htmlFor='wallet_key' */}
        <input 
          className="form-input"
          type='text'
          id='wallet_key'
          autoComplete='off'
          value={walletKey}
          onChange={e => setWalletKey(e.target.value)}
        />
      </div>
      <div className='form-field'>
        <label>Password </label>
        <input
          className="form-input"
          type='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete='current-password'
        />
      </div>
      <div className='form-field'>
        <label>Password Confirmation </label>
        <input 
          className="form-input"
          type='password'
          id='password_confirmation'
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          autoComplete='current-password'
        />
      </div>
      <div className='button-wrapper'>
        <button type='submit' className='button'>Create Account</button> 
      </div>
      {errors.map(err => (
        <div key={err} className='error'>🗙 {err}</div>
      ))}
    </form>
  )
}

export default CreateAccountForm