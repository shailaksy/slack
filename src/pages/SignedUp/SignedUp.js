import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../SignedUp/SignedUp.css";

function SignedUp() {
  return (
    <div className="signed-up">
      <div className="logo-container">
        <img src={logo} className="home-logo" />
      </div>
      <div className="signed-up-container">
        <div className="signed-up-message">
          <h1>Welcome to Slack!</h1>
          <h3>You have succesfully signed up.</h3>
        </div>
        <div>
          <Link className="login-link-button" to="/login" type="button">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignedUp;
