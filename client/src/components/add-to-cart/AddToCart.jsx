import axios from "axios";

async function AddToCart(auth_id, product_id) {
  const token = localStorage.getItem(auth_id);
  try {
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:3000/cart/${auth_id}/${product_id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Response from AddToCart function:", response);
    return response.data.message;
  } catch (error) {
    console.error("Error in AddToCart:", error);
    throw error;
  }
}

export default AddToCart;