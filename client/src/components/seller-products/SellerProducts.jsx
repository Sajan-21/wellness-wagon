import axios from 'axios';

async function SellerProducts(token, seller_id) {
    try {
        let response = await axios({
            method : "GET",
            url : `http://localhost:3000/seller-products/${seller_id}`,
            headers : {Authorization : `Bearer ${token}`}
        });
        return response.data.data;
    } catch (error) {
        console.log("error : ",error);
    }
  return
}

export default SellerProducts