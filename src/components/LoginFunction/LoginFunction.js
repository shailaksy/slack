import { useState } from "react"


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
        <div>
            <form onSubmit={handleLogin}>
                {error !== '' ? <p>{error}</p> : ''}
                    <div className="login-username-input"> 
                        <label>Username</label>
                        <input
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
                    <div className="login-password-input">
                        <label>Password</label>
                        <input 
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
                        onClick={Login}
                        type="submit">
                    Login
                    </button>
            </form>
        </div>
    )

}

export default LoginFunction