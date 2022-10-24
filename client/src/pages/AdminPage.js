import "../App.css";
import React from "react";

function AdminPage() {
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
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogin) {
          document.getElementById("home").style = "display: none";
          document.getElementById("logout").style = "display: block";
          document.getElementById("admin").style = "display: block";
        }
      });
  }, [data]);
  function CreateElement() {
    var products = document.getElementById("products");
    Array.from(data).forEach((elem) => {
      var block = document.createElement("div");
      block.className = "card";
      block.style = "justify-content: space-between;";

      var name = document.createElement("p");
      name.innerHTML = `${elem.ProductName} - ${elem.Price}$`;
      name.className = "product";
      block.appendChild(name);

      var deletebtn = document.createElement("button");
      deletebtn.innerHTML = "Delete";
      deletebtn.className = "deletebtn";
      deletebtn.onclick = (e) => DeleteProduct(e);
      block.appendChild(deletebtn);

      products.appendChild(block);
    });
  }
  function DeleteProduct(e) {
    e.target.parentElement.remove();
  }
  return (
    <div className="App">
      <h1>Hello Admin!</h1>
      <div id="products"></div>
    </div>
  );
}

export default AdminPage;
