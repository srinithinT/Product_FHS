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
    headers: { Authorization: `Bearer ${token}` },
    body: userData,
  });

  console.log(userResponse, userData, token, "added product");
  if (!userResponse.ok) {
    throw new Error("creating product failed");
  }
  return userResponse.json();
};

export const addToCart = async (token, userData) => {
  console.log(userData, "userdata", token);

  const userResponse = await fetch(`${BaseUrl}/cart`, {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    body: JSON.stringify(userData),
  });

  if (!userResponse.ok) {
    throw new Error("adding the product to cart isfailed");
  }
  return userResponse.json();
};
export const getProfile = async (token) => {
  const userResponse = await fetch(`${BaseUrl}/profile`, {
    headers: { Authorization: "Bearer " + token },
  });
  console.log(token, "toekn");
  if (!userResponse.ok) {
    throw new Error("Fetch Products");
  }
  return userResponse.json();
};
export const getCart = async (token) => {
  const userResponse = await fetch(`${BaseUrl}/cart`, {
    headers: { Authorization: "Bearer " + token },
  });
  console.log(token, userResponse, "userResponse");

  if (!userResponse.ok) {
    throw new Error("Fetch Products");
  }
  return userResponse.json();
};

export const removeFromCart = async (token, productId) => {
  const userResponse = await fetch(`${BaseUrl}/cart/${productId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  console.log(token, "toekn");
  if (!userResponse.ok) {
    throw new Error("deleting product in cart");
  }
  return userResponse.json();
};
