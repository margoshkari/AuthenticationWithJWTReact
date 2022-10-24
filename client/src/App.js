import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  function Profile() {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  function AdminProfile() {
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">App</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route exact path="/Register" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
      {/* <button onClick={Profile}>Profile</button>
      <br></br>
      <button onClick={AdminProfile}>Admin Profile</button> */}
    </div>
  );
}

export default App;
