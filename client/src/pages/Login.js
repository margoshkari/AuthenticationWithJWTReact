import "../App.css";
import React from "react";
function LoginApp({ name, updateLogin }) {
  React.useEffect(() => {
    document.getElementById("login").style = "display: block";
    document.getElementById("register").style = "display: block";
  }, []);
  function Login() {
    var username = document.getElementById("usernamelog").value;
    var password = document.getElementById("passwordlog").value;
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogin) {
          updateLogin(true, data.role);
        } else {
          updateLogin(false, "");
        }
      });
  }
  return (
    <div className="App">
      <div className="Login">
        <h2>Login</h2>
        <input type="text" placeholder="Nickname" id="usernamelog"></input>
        <input type="password" placeholder="Password" id="passwordlog"></input>
        <button onClick={Login}>Login</button>
      </div>
    </div>
  );
}

export default LoginApp;
