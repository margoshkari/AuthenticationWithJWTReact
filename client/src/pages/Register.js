import "../App.css";

function RegisterApp({ updateRegister }) {
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
        if (data.isRegister) {
          updateRegister(true);
        } else {
          updateRegister(false);
        }
      });
  }
  return (
    <div className="Registration">
      <h2>Register</h2>
      <input type="text" placeholder="Nickname" id="username"></input>
      <input type="password" placeholder="Password" id="password"></input>
      <button onClick={Register}>Register</button>
    </div>
  );
}

export default RegisterApp;
