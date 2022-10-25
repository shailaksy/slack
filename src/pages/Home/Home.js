import { Link } from "react-router-dom";
import apple from "../../assets/apple.png";
import google from "../../assets/google.png";
import logo from "../../assets/logo.png";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "../Home/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="logo-container">
        <img src={logo} className="home-logo" />
      </div>
      <div className="home-container">
        <h1>First, enter your email</h1>
        <p>We suggest using the email address you use at work.</p>
        <div className="continue-with-container">
          <p className="continue-button">
            <img src={google} className="continue-icon" />
            Continue with Google
          </p>
          <p className="continue-button">
            <img src={apple} className="continue-icon" />
            Continue with Apple
          </p>
        </div>
        <div className="or-container">
          <hr />
          <p>OR</p>
          <hr />
        </div>
        <div className="signup-form-container">
          <SignUpForm />
        </div>
        <div className="login-link-container">
          <p>Already using Slack?</p>
          <Link to={"/login"} className="login-link">
            Sign in to an existing workspace
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
