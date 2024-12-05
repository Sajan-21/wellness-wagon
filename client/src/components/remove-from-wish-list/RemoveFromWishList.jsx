import axios from "axios"

async function RemoveFromWishList(auth_id, product_id) {
    try {
        let token = localStorage.getItem(auth_id);
        let response = await axios({
            method : "PATCH",
            url : `http://localhost:3000/remove-from-wish-lists/${auth_id}/${product_id}`,
            headers : {Authorization : `Bearer ${token}`}
        });
        console.log("response : ",response);
        return response.data;
    } catch (error) {
        console.log("error from remove from wish-list function : ",error);
        return error.data.message ? error.data.message : [];
    }
}

export default RemoveFromWishList