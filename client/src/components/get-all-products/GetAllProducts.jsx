import axios from 'axios';

async function GetAllProducts(auth_id, category, user_type) {
    console.log(auth_id, category, user_type);
    try {
        let response = await axios({
            method: "GET",
            url: `http://localhost:3000/products/${auth_id}/${category}/${user_type}`
        });
        return response.data.data;
    } catch (error) {
        console.log("error : ",error);
    }
}

export default GetAllProducts
