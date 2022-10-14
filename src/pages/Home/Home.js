import { Link } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import '../Home/Home.css';

function Home() {

    return(
       <div className="welcome">
            <div className="welcome-container">
               <h1>Welcome to Slack!</h1>
                <SignUpForm />
                <p>Already have an account?</p>
                <Link 
                    to={"/login"}
                    className='login-link'
                    >
                    Log in
                </Link> 
            </div>
        </div> 
    )
    
}

export default Home