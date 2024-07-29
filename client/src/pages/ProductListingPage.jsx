import { useContext, useEffect, useState } from "react";
import { addProducts, addToCart, getProducts } from "../api/api";
import { CartContext } from "../components/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/product.css";

function ProductListingPage({ token }) {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    imageurl: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch products", e);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const { addProductToCart } = useContext(CartContext);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(token, { productId: product._id, quantity: 1 });
      addProductToCart(product);
      toast.success("Product added to cart");
    } catch (e) {
      console.error("Failed to add product to cart", e);
      toast.error("Failed to add product to cart");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!newProduct.name) newErrors.name = "Name is required";
    if (!newProduct.price || newProduct.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!newProduct.quantity || newProduct.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const data = await addProducts(token, newProduct);
      setProducts(data);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        quantity: "",
        imageurl: "",
      });
      setShowAddProduct(false);
      toast.success("Product added successfully");
    } catch (e) {
      console.error("Failed to add product", e);
      toast.error("Failed to add product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  console.log(products, "products");
  return (
    <div className="product-container">
      <ToastContainer />
      <h2>Product List</h2>
      <button className="add-product-button" onClick={() => setShowAddProduct(true)}>
        Add Product
      </button>

      {showAddProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              {errors.name && <p className="error-message">{errors.name}</p>}
              <div className="form-input">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  placeholder="Product name"
                />
              </div>

              {errors.price && <p className="error-message">{errors.price}</p>}
              <div className="form-input">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  placeholder="Product price"
                />
              </div>

              {errors.quantity && <p className="error-message">{errors.quantity}</p>}
              <div className="form-input">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleChange}
                  placeholder="Product quantity"
                />
              </div>

              <div className="form-input">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  placeholder="Product description"
                />
              </div>

              <div className="form-input">
                <label>Image URL</label>
                <input
                  type="text"
                  name="imageurl"
                  value={newProduct.imageurl}
                  onChange={handleChange}
                  placeholder="Product image URL"
                />
              </div>

              <button type="submit">Add Product</button>
              <button type="button" onClick={() => setShowAddProduct(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <p>No Products Available</p>
      ) : (
        <ul className="product-list">
          {products.map((prod) => (
            <li className="product-item" key={prod._id}>
              <div className="product-image">
                <img src={prod.imageurl} alt={prod.name} />
              </div>
              <div className="product-details">
                <h3>{prod.name}</h3>
                <p>Quantity: {prod.quantity}</p>
                <p>Description: {prod.description}</p>
                <p>Price: ${prod.price}</p>
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
