import "../SignUpForm/SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpForm() {
  
  let navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [error, setError] = useState("Please fill out all fields");

  let users = [
    {
        email: "shai@mail.com",
        username: "shai",
        password: "user"
    }
  ]

localStorage.setItem("signedUpUsers", JSON.stringify(users));

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
    e.preventDefault();

    const user = signedUpUsers.find((user) => {
        return newUser.username === user.username;
    })

    if (user) {
        setError("Username is already taken");
        setNewUser({
            email: "",
            username: "",
            password: ""
        });
    } else if (newUser.email === "" || newUser.username === "" || newUser.password === "") {
        setError("Incomplete information");
        setNewUser({
            email: "",
            username: "",
            password: ""
        });
    } else {
        localStorage.setItem("signedUpUsers", JSON.stringify([...signedUpUsers, newUser]));
        navigate('/signedup');
    }
  }

return(
  <div className='signup-form'>
    <form method="GET">
      <div>
        <p className="error-message">{error}</p>
        <div className='signup-form-inputs'>
          <label>Email</label>
          <input 
            className="signup-form-input"
            onChange={handleEmail}
            value={newUser.email}
            type="email"
            placeholder="Email"
            autoComplete="off"
            required />
        </div>
        <div className='signup-form-inputs'>
          <label>Username</label>
          <input 
            className="signup-form-input"
            onChange={handleUsername}
            type="text"
            value={newUser.username}
            placeholder="Username"
            autoComplete="off"
            required />
          </div>
          <div className='signup-form-inputs'>
          <label>Password</label>
          <input 
            className="signup-form-input"
            onChange={handlePassword}
            type="password"
            value={newUser.password}
            placeholder="Password" 
            autoComplete="off"
            required />
          </div>
          <div className='signup-form-inputs'>
            <label>Confirm Password</label>
            <input 
              className="signup-form-input"
              type="password"
              //value={newUser.password}
              placeholder="Password" 
              autoComplete="off"
              required />
          </div>
      </div>
      <div className='signup-checkbox'>
        <input
          type="checkbox"
          required />
        <label>I agree to the terms and conditions.</label>
      </div>
        <button
            type="submit"
            onClick={handleSignUp}
            className='signup-button'
        >
        Sign Up
        </button>
    </form>
  </div>
)
}
    
export default SignUpForm