import axios from "axios";

async function OrderProduct(auth_id, product_id) {
    try {
        let token = localStorage.getItem(auth_id);
        let response = await axios({
            method : "PATCH",
            url : `http://localhost:3000/order-product/${auth_id}/${product_id}`,
            headers : {Authorization : `Bearer ${token}`}
        });
        console.log("response : ",response);
        return response.data;
    } catch (error) {
        console.log("error in orderProduct function : ",error);
        return error.response.data.message ? error.response.data.message : error;
    }
}

export default OrderProduct