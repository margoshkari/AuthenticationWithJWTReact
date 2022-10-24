import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import { createBrowserHistory } from "history";

function App() {
  function LogOut() {
    fetch("/api/logout")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    history.push("/");
    history.go();
  }

  const history = createBrowserHistory({ forceRefresh: true });
  function updateLogin(isLogin, role) {
    if (isLogin == true) {
      if (role == "user") {
        history.push("/UserPage");
      } else if (role == "admin") {
        history.push("/AdminPage");
      }
      history.go();
    }
  }
  function updateRegister(isRegister) {
    if (isRegister == true) {
      history.push("/login");
      history.go();
    }
  }
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li id="home">
                <Link to="/">Home</Link>
              </li>
              <li id="login">
                <Link to="/login">Login</Link>
              </li>
              <li id="register">
                <Link to="/register">Register</Link>
              </li>{" "}
              <li id="admin">
                <Link to="/adminPage">Admin</Link>
              </li>
              <li id="logout">
                <Link onClick={LogOut}>LogOut</Link>
              </li>
            </ul>
          </nav>
          <Routes history={history}>
            <Route path="/" element={<UserPage />}></Route>
            <Route
              path="/Login"
              element={<Login name={"tmp"} updateLogin={updateLogin} />}
            ></Route>
            <Route
              exact
              path="/Register"
              element={<Register updateRegister={updateRegister} />}
            ></Route>
            <Route exact path="/UserPage" element={<UserPage />}></Route>
            <Route exact path="/AdminPage" element={<AdminPage />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
