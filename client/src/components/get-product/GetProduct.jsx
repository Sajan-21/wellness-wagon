import axios from 'axios';
import React from 'react'

async function GetProduct(product_id) {

    try {
        let response = await axios({
            method : "GET",
            url : `http://localhost:3000/product/${product_id}`,
        });
        console.log("response : ",response);
        return response.data.data;
    } catch (error) {
        console.log("error : ",error);
    }

  return
}

export default GetProduct
