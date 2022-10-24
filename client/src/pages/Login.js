import "../App.css";

function LoginApp() {
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
        console.log(data);
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
