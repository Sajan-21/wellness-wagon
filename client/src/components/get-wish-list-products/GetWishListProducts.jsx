import axios from "axios";

async function GetWishListProducts(user_id) {
    try {
        let token = localStorage.getItem(user_id);
        let response = await axios({
            method : "GET",
            url : `http://localhost:3000/wish-list/${user_id}`,
            headers : {Authorization : `Bearer ${token}`},
        });
        return response.data.data;
    } catch (error) {
        console.log("error : ",error);
        return error ? error : [];
    }
}

export default GetWishListProducts;