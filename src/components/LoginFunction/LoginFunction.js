import { useState } from "react"
import'../LoginFunction/LoginFunction.css'

const LoginFunction = ( { Login, error } ) => {
    
    const [details, setDetails] = useState({
        username: '',
        password: ''
    })

    const handleLogin = (e) => {
        e.preventDefault()
        Login(details);
    }

    return(
        <div className="login">
            <div className="login-container">
            <h1>Welcome back!</h1>
            <form onSubmit={handleLogin}>
                {error !== '' ? <p className="error-message">{error}</p> : ''}
                    <div className="login-inputs"> 
                        <label>Username</label>
                        <input
                            className="login-input"
                            type='text'
                            name='username'
                            username='username'
                            onChange={(e) => {
                                setDetails({
                                    ...details,
                                    username: e.target.value
                                })}}
                            value={details.username}
                            placeholder='Username' />
                    </div>
                    <div className="login-inputs">
                        <label>Password</label>
                        <input 
                            className="login-input"
                            type='password'
                            name='password'
                            password='password'
                            onChange={(e) => {
                                setDetails({
                                    ...details,
                                    password: e.target.value
                                })}}
                            value={details.password}
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