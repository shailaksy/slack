import { Link } from "react-router-dom"

function SignedUp() {
    return(
        <div>
           <div className="signed-up-message">
                <h1>Welcome to Slack!</h1>
                <h3>You have succesfully signed up.</h3>
            </div>
            <div className="to-login-button">
                <Link
                    to='/login'
                    type='button'>
                    Login
                </Link>
            </div> 
        </div>
    )
}

export default SignedUp