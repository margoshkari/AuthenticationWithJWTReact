import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="Registration">
        <h2>Register</h2>
        <input type="text" placeholder="Nickname"></input>
        <input type="password" placeholder="Password"></input>
        <button>Register</button>
      </div>
      <div className="line"></div>
      <div className="Login">
        <h2>Login</h2>
        <input type="text" placeholder="Nickname"></input>
        <input type="password" placeholder="Password"></input>
        <button>Login</button>
      </div>
    </div>
  );
}

export default App;
