import "../SignUpForm/SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpForm() {
  
  let navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("Please fill out all fields");
  
  /*const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: ""
  });

  let users = [
    {
        email: "shai@mail.com",
        username: "shai",
        password: "user"
    }
  ]

localStorage.setItem("signedUpUsers", JSON.stringify(users));

const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers"));
*/

  const handleSignUp = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      password_confirmation: password
    }

    fetch('http://206.189.91.54/api/v1/auth/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        response.headers.forEach((val, key) => {
          console.log(key + '->' + val)
          console.log(response.status)
        })
        return response.json()
      })
      .then((result) => {
        console.log(result)
      })

    /*if (user) {
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
    }  */
  }

return(
  <div className='signup-form'>
    <form method="GET" onSubmit={handleSignUp}>
      <div>
      <p className="error-message">{error}</p>
        <div className='signup-form-inputs'>
          <label>Email</label>
          <input 
            className="signup-form-input"
            onChange={(e) => {setEmail(e.target.value)}}
            value={email}
            type="email"
            placeholder="Email"
            autoComplete="off"
            required />
        </div>
        <div className='signup-form-inputs'>
          <label>Password</label>
          <input 
            className="signup-form-input"
            onChange={(e) => {setPassword(e.target.value)}}
            type="password"
            value={password}
            placeholder="Password"
            autoComplete="off"
            required />
          </div>
          <div className='signup-form-inputs'>
          <label>Password</label>
          <input 
            className="signup-form-input"
            type="password"
            placeholder="Re-type Password" 
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