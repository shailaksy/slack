import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import'../LoginFunction/LoginFunction.css'

const LoginFunction = ( { Login } ) => {
    
  let navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [receivers, setReceivers] = useState([])

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

              if (response.status === 200) {
                navigate('/dashboard')
                localStorage.setItem('signedInUser',data.email)
              } else {
                setError('Invalid match')
              }

              response.headers.forEach((val, key) => {
                localStorage.setItem(key,val)
              })
              return response.json()
            })
    }

    const fetchUsers = async () => {
      await fetch("http://206.189.91.54/api/v1/users", {
          method: 'GET',
          headers: {
              'access-token': localStorage.getItem('access-token'),
              client: localStorage.getItem('client'),
              expiry: localStorage.getItem('expiry'),
              uid: localStorage.getItem('uid'),
              'Content-Type': 'application/json'
          }
      })
      .then((response) => {
          return response.json()
      })
      .then((result) => {
          setReceivers(result.data)
      })
  }

  
  useEffect(() => {
     fetchUsers();
  },[])

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
