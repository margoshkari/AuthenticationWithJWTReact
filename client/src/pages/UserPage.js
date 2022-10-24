import "../App.css";
import React from "react";

function UserPage() {
  var data = [];
  const dataFetchedRef = React.useRef(false);
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    fetch(`/api/products`)
      .then((res) => res.json())
      .then((productsData) => {
        data = productsData.products;
        window.addEventListener("load", CreateElement());
      });

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
  }, [data]);
  function CreateElement() {
    var products = document.getElementById("products");
    Array.from(data).forEach((elem) => {
      var block = document.createElement("div");
      block.className = "card";
      block.style = "justify-content: center;";

      var name = document.createElement("p");
      name.innerHTML = `${elem.ProductName} - ${elem.Price}$`;
      name.className = "product";
      block.appendChild(name);

      products.appendChild(block);
    });
  }
  return (
    <div className="App">
      <h1>Hello User!</h1>
      <div id="products"></div>
    </div>
  );
}

export default UserPage;
