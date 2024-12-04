import React from 'react'
import axios from 'axios';

async function DeleteProducts(token, auth_id, product_id) {

    try {
        let response = await axios({
            method : "DELETE",
            url : `http://localhost:3000/product/${auth_id}/${product_id}`,
            headers : {Authorization : `Bearer ${token}`}
        });
        console.log("response : ",response);
        return response.data;
    } catch (error) {
        console.log("error : ",error);
    }

  return
}

export default DeleteProducts