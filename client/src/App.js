import "./App.css";

function App() {
  function Register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    fetch("/api/register", {
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
  function Profile() {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div className="App">
      <div className="Registration">
        <h2>Register</h2>
        <input type="text" placeholder="Nickname" id="username"></input>
        <input type="password" placeholder="Password" id="password"></input>
        <button onClick={Register}>Register</button>
      </div>
      <div className="line"></div>
      <div className="Login">
        <h2>Login</h2>
        <input type="text" placeholder="Nickname" id="usernamelog"></input>
        <input type="password" placeholder="Password" id="passwordlog"></input>
        <button onClick={Login}>Login</button>
      </div>
      <div className="line"></div>
      <button onClick={Profile}>Profile</button>
    </div>
  );
}

export default App;
