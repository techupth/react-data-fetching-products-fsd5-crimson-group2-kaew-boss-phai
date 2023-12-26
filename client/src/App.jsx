import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [productList, setProductList] = useState([]);
  const getProductList = async () => {
    const response = await axios.get("http://localhost:4001/products");
    setProductList(response.data.data);
  };
  getProductList();

  useEffect(() => {
    getProductList();
  }, []);
  async function deleteProductList(id) {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const newProductList = productList.filter((item) => {
      return item.id !== id;
    });
    setProductList(newProductList);
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productList.map((items) => {
          return (
            <div key={items.id} className="product">
              <div className="product-preview">
                <img
                  src={items.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {items.name}</h1>
                <h2>Product price: {items.price} Baht</h2>
                <p>Product description: {items.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProductList(items.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
