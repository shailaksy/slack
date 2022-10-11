import "./SignUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
    
    const [newUser, setNewUser] = useState({
        email: "",
        username: "",
        password: ""
      });
    
    const [error, setError] = useState("");
    
    const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers"));
    
      const handleEmail = (e) => {
        setNewUser({
          ...newUser,
          email: e.target.value
        })
      }
    
      const handleUsername = (e) => {
        setNewUser({
          ...newUser,
          username: e.target.value
        })
      }
    
      const handlePassword = (e) => {
        setNewUser({
          ...newUser,
          password: e.target.value
        })
      }
    
      const handleSignUp = (e) => {
        const user = signedUpUsers.find((user) => {
            return newUser.username === user.username;
        })
    
        if (user) {
            e.preventDefault();
            setError("try again");
        } else {
            localStorage.setItem("signedUpUsers", JSON.stringify(...signedUpUsers, newUser))
        }
      }
    
return (
    <div className='sign-up-form'>
      <form method="GET">
        <div className='sign-up-form-inputs'>
          <p>{error}</p>
            <label>Email</label>
            <input 
              onChange={handleEmail}
              value={newUser.email}
              type="email"
              placeholder="Email"
              required />
            <label>Username</label>
            <input 
              onChange={handleUsername}
              type="text"
              value={newUser.username}
              placeholders="Username"
              required />
            <label>Password</label>
            <input 
              onChange={handlePassword}
              type="password"
              value={newUser.password}
              placeholder="Password" 
              required />
        </div>
        <div className='sign-up-checkbox'>
          <input
            type="checkbox"
            required />
          <p>I agree to the terms and conditions.</p>
        </div>
        <div>
          <Link
            to="/signedup"
            type="submut"
            onClick={handleSignUp}>
              Sign Up 
          </Link>
        </div>
      </form>
    </div>
)
    
}
    
export default SignUp