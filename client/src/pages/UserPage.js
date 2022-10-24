import "../App.css";
import React from "react";

function UserPage() {
  React.useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogin) {
          document.getElementById("logout").style = "display: block";
        } else {
          document.getElementById("login").style = "display: block";
          document.getElementById("register").style = "display: block";
        }
      });
  }, []);
  return (
    <div className="App">
      <h1>Hello User!</h1>
    </div>
  );
}

export default UserPage;
