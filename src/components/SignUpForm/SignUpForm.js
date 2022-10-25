import "../SignUpForm/SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpForm() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      password_confirmation: password,
    };

    fetch("http://206.189.91.54/api/v1/auth/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/signedup");
        }
        return response.json();
      })
      .then((result) => {
        const errorMessages = result.errors.full_messages;
        const lastErrorMessage = errorMessages[errorMessages.length - 1];
        setError(lastErrorMessage);
      });
  };

  return (
    <div className="signup-form">
      <form method="GET" onSubmit={handleSignUp}>
        <div className="signup-form-inputs">
          <input
            className="signup-form-input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="Email address"
            autoComplete="off"
            spellCheck="off"
            required
          />
        </div>
        <div className="signup-form-inputs">
          <input
            className="signup-form-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
            placeholder="Password"
            autoComplete="off"
            required
          />
        </div>
        <div className="signup-form-inputs">
          <input
            className="signup-form-input"
            type="password"
            placeholder="Re-type Password"
            autoComplete="off"
            spellCheck="off"
            required
          />
        </div>
        <p className="error-message">{error}</p>
        <button type="submit" onClick={handleSignUp} className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
