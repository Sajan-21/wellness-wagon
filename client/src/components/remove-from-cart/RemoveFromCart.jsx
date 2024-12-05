import axios from "axios"

async function RemoveFromCart(auth_id, product_id) {
    try {
        let token = localStorage.getItem(auth_id);
        let response = await axios({
            method : "PATCH",
            url : `http://localhost:3000/remove-from-cart/${auth_id}/${product_id}`,
            headers : {Authorization : `Bearer ${token}`}
        });
        return response.data.message;
    } catch (error) {
        console.log("error from remove from cart function : ",error);
        return error.data.message ? error.data.message : [];
    }
}

export default RemoveFromCart