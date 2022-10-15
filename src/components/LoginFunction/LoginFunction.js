import { useState } from "react"
import'../LoginFunction/LoginFunction.css'

const LoginFunction = ( { Login, error } ) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        
        //Login(details);
        
        const data = {
            email: email,
            password: password,
          }
      
          fetch('http://206.189.91.54/api/v1/auth/sign_in/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((response) => {
              response.headers.forEach((val, key) => {
                console.log(key + '->' + val)
                console.log(response.status)
              })
              return response.json()
            })
            .then((result) => {
              console.log(result)
            })
    }

    return(
        <div className="login">
            <div className="login-container">
            <h1>Welcome back!</h1>
            <form onSubmit={handleLogin}>
                {error !== '' ? <p className="error-message">{error}</p> : ''}
                    <div className="login-inputs"> 
                        <label>Email</label>
                        <input
                            className="login-input"
                            type='email'
                            name='email'
                            email='email'
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                            placeholder='Email' />
                    </div>
                    <div className="login-inputs">
                        <label>Password</label>
                        <input 
                            className="login-input"
                            type='password'
                            name='password'
                            password='password'
                            onChange={(e) => {setPassword(e.target.value)}}
                            value={password}
                            placeholder='Password'/>
                    </div>
                    <button 
                        className="login-button"
                        onClick={Login}
                        type="submit">
                    Login
                    </button>
            </form>
            </div>
        </div>
    )

}

export default LoginFunction