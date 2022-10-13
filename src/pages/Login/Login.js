import LoginFunction from "../../components/LoginFunction/LoginFunction";
import { useState } from "react";

function Login() {

    const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers"));

    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    
    const [error, setError] = useState('')

    const userLoggingIn = (details) => {
        signedUpUsers.map((user) => {
            if (
                details.username === user.username &&
                details.password === user.password
            ) {
                setUser({
                    username: details.username,
                    password: details.password
                })
            } else {
                setError('Username or password does not match.')
            }
        })
    }

    return(
        <div>
            {user.username !=='' ? (
                console.log('insert main app')
            ) : ( 
            <LoginFunction Login={userLoggingIn} error={error} />
        )}
    </div>
    )
}

export default Login