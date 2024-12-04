import axios from "axios";

async function AddToWishList({auth_id, product_id}) {
    
    const token = localStorage.getItem(auth_id);
  try {
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:3000/wish-list/${auth_id}/${product_id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Response from AddTowishlist function:", response);
    return response.data.message;
  } catch (error) {
    console.error("Error in AddToWishlist:", error);
    throw error;
  }
}

export default AddToWishList
