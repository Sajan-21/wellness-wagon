import axios from 'axios';

async function GetProductsBought(token, user_id) {
    try {
        let response = await axios({
            method : "GET",
            url : `http://localhost:3000/products-bought/${user_id}`,
            headers : {Authorization : `Bearer ${token}`}
        });
        console.log("response from products_bought function : ",response);
        return response.data.data;
    } catch (error) {
        console.log("error : ",error);
        return error.response.data.message ? error.response.data.message : [];
    }
}

export default GetProductsBought