import navigate from "navigate";
import "../LogoutFunction/LogoutFunction.css";

const LogoutFunction = () => {
  const handleLogout = () => {
    navigate("/");
    window.location.reload();
    localStorage.removeItem("signedInUser");
    localStorage.removeItem("access-token");
    localStorage.removeItem("expiry");
    localStorage.removeItem("content-type");
    localStorage.removeItem("client");
    localStorage.removeItem("cache-control");
    localStorage.removeItem("uid");
    localStorage.removeItem("token-type");
  };

  return (
    <div className="header">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutFunction;
