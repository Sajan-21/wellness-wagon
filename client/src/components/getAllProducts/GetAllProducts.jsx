import axios from 'axios';

async function GetAllProducts({ auth_id, category, user_type }) {
  console.log("auth_id : ",auth_id);
  try {
    let response = await axios({
      method: 'GET',
      url: `http://localhost:3000/products/${auth_id}/${category}/${user_type}`,
    });
    console.log("response : ",response);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default GetAllProducts;