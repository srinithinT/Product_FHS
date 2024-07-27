import { useContext, useEffect, useState } from "react";
import { addProducts, addToCart, getProducts } from "../api/api";
import { CartContext } from "../components/CartContext";
import "../styles/product.css";
function ProductListingPage({ token }) {
  console.log(token, "productlisting page");
  const [product, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    imageurl: "",
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error("failed to fetch the product", e);
      }
    };
    fetchProducts();
  }, []);

  const { addProductToCart } = useContext(CartContext);
  const handleAddToCart = async (product) => {
    try {
      await addToCart(token, { productId: product._id, quantity: 1 });
      addProductToCart(product);
    } catch (e) {
      console.error("failed to add the product to the cart", e);
    }
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    // if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
    //   return;
    // }
    try {
      console.log(newProduct, token, "newProduct");

      const data = await addProducts(token, newProduct);
      console.log(data, "dattt");
      setProducts(data);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        quantity: "",
        imageurl: "",
      });
    } catch (e) {
      console.error("failed to add the product", e);
    }
  };
  const handleChange = (e) => {
    console.log(product, newProduct, "prsssoduct-->");

    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
  console.log(product, newProduct, "product-->");
  return (
    <div className="product-container">
      <h2>Product List</h2>
      {!showAddProduct ? (
        <button onClick={() => setShowAddProduct(true)}> Add Product</button>
      ) : (
        <form onSubmit={handleAddProduct}>
          <div className="label-input">
            <label>Name</label>
            <input
              type="text"
              className="form-input"
              onChange={handleChange}
              name="name"
              value={newProduct.name}
              placeholder="product name"
            />
          </div>
          <div className="label-input">
            <label>Price</label>
            <input
              type="number"
              onChange={handleChange}
              name="price"
              className="form-input"
              value={newProduct.price}
              placeholder="product price"
            />
          </div>
          <div className="label-input">
            <label>Description</label>
            <input
              type="text"
              onChange={handleChange}
              name="description"
              className="form-input"
              value={newProduct.description}
              placeholder="product description"
            />
          </div>
          <div className="label-input">
            <label>Quantity</label>
            <input
              type="number"
              onChange={handleChange}
              name="quantity"
              className="form-input"
              value={newProduct.quantity}
              placeholder="product quantity"
            />
          </div>
          <div className="label-input">
            <label>ImageUrl</label>
            <input
              type="text"
              onChange={handleChange}
              name="imageurl"
              className="form-input"
              value={newProduct.imageurl}
              placeholder="product imageurl"
            />
          </div>
          <button type="submit"> Add Product</button>
        </form>
      )}
      {product.length == 0 ? (
        <div>
          <p>No Products Available</p>
        </div>
      ) : (
        <ul className="product-list">
          {product.map((prod) => (
            <li className="product-item" key={prod.id}>
              <div>
                <img src={prod.imageurl} alt={prod.name}></img>
              </div>
              <div>
                <h3>{prod.name}</h3>
                <p>{prod.quantity}</p>
                <p>{prod.description}</p>
                <p>{prod.price}</p>
                <button onClick={() => handleAddToCart(prod)}>Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductListingPage;
