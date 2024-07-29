const BaseUrl = "http://localhost:4000/api";
export const signup = async (userData) => {
  const userResponse = await fetch(`${BaseUrl}/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userData),
  });
  console.log(userResponse, "userresponse");
  if (!userResponse.ok) {
    throw new Error("Signup Failed");
  }
  return userResponse.json();
};

export const login = async (userData) => {
  const userResponse = await fetch(`${BaseUrl}/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!userResponse.ok) {
    throw new Error("Login Failed");
  }
  return userResponse.json();
};
export const getProducts = async () => {
  const userResponse = await fetch(`${BaseUrl}/products`);
  if (!userResponse.ok) {
    throw new Error("Fetch Products");
  }
  return userResponse.json();
};
export const addProducts = async (token, userData) => {
  const userResponse = await fetch(`${BaseUrl}/products`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },

    body: JSON.stringify(userData),
  });

  console.log(userResponse, userData, token, "added product");
  if (!userResponse.ok) {
    throw new Error("creating product failed");
  }
  return userResponse.json();
};

export const addToCart = async (token, userData) => {
  try {
    const userResponse = await fetch(`${BaseUrl}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(userData),
    });
    console.log(userData, "userdata from add to cart");
    if (!userResponse.ok) {
      throw new Error("Adding the product to cart failed");
    }
    return userResponse.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getProfile = async (token) => {
  const userResponse = await fetch(`${BaseUrl}/profile`, {
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
  });
  console.log(token, "toekn");
  if (!userResponse.ok) {
    throw new Error("Fetch Products");
  }
  return userResponse.json();
};
export const getCart = async (token) => {
  const userResponse = await fetch(`${BaseUrl}/cart`, {
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
  });
  console.log(token, userResponse, "userResponse");

  if (!userResponse.ok) {
    throw new Error("Fetch Products");
  }
  return userResponse.json();
};
export const removeFromCart = async (token, productId) => {
  try {
    const userResponse = await fetch(`${BaseUrl}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      const errorDetails = await userResponse.json();
      throw new Error(`Deleting product from cart failed: ${errorDetails.message}`);
    }
    return userResponse.json();
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};
