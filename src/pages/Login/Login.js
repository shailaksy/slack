import LoginFunction from "../../components/LoginFunction/LoginFunction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    let navigate = useNavigate();

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
                setError('invalid match');
            }
        })
    }

    return(
        <div>
            {user.username !=='' ? (
                navigate('/dashboard')
            ) : ( 
            <LoginFunction Login={userLoggingIn} error={error} />
        )}
    </div>
    )
}

export default Login