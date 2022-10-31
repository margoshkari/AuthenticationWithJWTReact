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
          console.log(data.error.errors[0].msg);
          ShowValidationMessage(
            data.error.errors[0].param,
            data.error.errors[0].msg
          );
          updateRegister(false);
        }
      });
  }
  function ShowValidationMessage(param, msg) {
    let fields = document.getElementsByClassName("field");
    Array.from(fields).forEach((element) => {
      element.style = "border: 1px solid black";
    });
    switch (param) {
      case "username":
        document.getElementById("username").style = "border: 1px solid red";
        break;
      case "password":
        document.getElementById("password").style = "border: 1px solid red";
        break;
    }
    let span = document.getElementById("error_message");
    span.style = "color: red;";
    span.innerHTML = msg;
  }
  return (
    <div className="Registration">
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Nickname"
        id="username"
        className="field"
      ></input>
      <input
        type="password"
        placeholder="Password"
        id="password"
        className="field"
      ></input>

      <span id="error_message"></span>
      <button onClick={Register}>Register</button>
    </div>
  );
}

export default RegisterApp;
