// import axios from "axios";

// async function OrderProduct(auth_id, product_id, body) {
//     try {
//         let token = localStorage.getItem(auth_id);
//         let response = await axios({
//             method : "PATCH",
//             url : `http://localhost:3000/order-product/${auth_id}/${product_id}`,
//             headers : {Authorization : `Bearer ${token}`},
//             data : {
//                 quantity : body.quantity,
//                 totalPrice : body.totalPrice
//             }

//         });
//         console.log("response : ",response);
//         return response.data;
//     } catch (error) {
//         console.log("error in orderProduct function : ",error);
//         return error.response.data.message ? error.response.data.message : error;
//     }
// }

// export default OrderProduct

import axios from "axios";

async function OrderProducts(auth_id, cartItems) {
    try {
        let token = localStorage.getItem(auth_id);
        let response = await axios({
            method: "PATCH",
            url: `http://localhost:3000/order-products/${auth_id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: { cartItems }, // Send the entire cart as an array
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.error("Error in OrderProducts function: ", error);
        return error.response?.data?.message ? error.response.data.message : error;
    }
}

export default OrderProducts;
