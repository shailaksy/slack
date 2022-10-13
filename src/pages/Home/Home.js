import { Link } from "react-router-dom"

function Home() {

    return(
       <div>
            <h1>Welcome to Slack!</h1>
            <Link to={"/signup"}>
                Sign up
            </Link>
            <p>Already have an account?</p>
            <Link to={"/login"}>Log in</Link>
        </div> 
    )
    
}

export default Home