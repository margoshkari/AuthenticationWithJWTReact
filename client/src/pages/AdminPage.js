import "../App.css";
import React from "react";

function AdminPage() {
  React.useEffect(() => {
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogin) {
          document.getElementById("home").style = "display: none";
          document.getElementById("logout").style = "display: block";
          document.getElementById("admin").style = "display: block";
        }
      });
  }, []);
  return (
    <div className="App">
      <h1>Hello Admin!</h1>
    </div>
  );
}

export default AdminPage;
